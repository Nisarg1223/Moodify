const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyRegister) {
    return res.status(409).json({
      message: "user already register",
    });
  }
  const hash =await bcrypt.hash(password, 10);
  const user =await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({
    id:user_id,
    username:user.username
  },process.env.JWT_SECRET,
{
    expiresIn:'1h'
})

    res.cookie('token',token);

    res.status(201).json({
        message:'user registered sucessfully',
        user:{
            id:user_id,
            username:user.username,
            email:user.email
        }
    })
}
async function loginUser(req,res){
    const {username,password,email} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(!user){
        res.status(404).json({
            message:'user not found'
        })
    }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.status(409).json({
        message:'invalid password'
    })
  }

  const token = jwt.sign(
    {
        id:user._id,
        username:username
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'1h'
    }
  )
  res.cookie('token',token);

  return res.status(200).json({
    message:'User Loggedin Succcessfully',
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
  })
}
module.exports = {
  registerUser,
  loginUser
};
