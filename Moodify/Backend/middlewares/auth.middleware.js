const jwt = require('jsonwebtoken');
const redis = require('../src/config/cache.js');

async function authUser(req,res,next){

 // Accept token from cookie OR Authorization: Bearer <token> header
 const token =
   req.cookies.token ||
   (req.headers.authorization?.startsWith('Bearer ')
     ? req.headers.authorization.split(' ')[1]
     : null);

 if(!token){
    return res.status(401).json({
        message:'token is not provided'
    })
 }


 // check redis
 const isBlacklisted = await redis.get(token);

 if(isBlacklisted){
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