const mongoose = require('mongoose');
async function connectedtoDB(){
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log('connectrd to DB')
    }
    catch(err){
       console.log(err);
    }
}

module.exports = connectedtoDB