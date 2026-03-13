const userModel = require('../models/user.model.js');
const BlacklistModel = require('../models/blacklist.model.js');
const jwt = require('jsonwebtoken');

async function authUser(req,res,next){
 const token = req.cookies.token;

 if(!token){
    return res.status(401).json({
        message:'token is not provided'
    })
 }

 const isTokenBlacklisted = await BlacklistModel.findOne({
    token:token
 })

 if(isTokenBlacklisted){
    return res.status(401).json({
        message:'invalid token'
    })
 }
try{
  
const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.user = decoded;
next();
}
catch(err){
  return res.status(401).json({
    message:'Invalid token'
  })
}

}


module.exports = {
    authUser
}