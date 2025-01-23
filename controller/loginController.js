const User = require("../models/userModels")
const bcrypt = require('bcrypt');


const login = async(req,res)=>{
    let {email,password}=req.body

    let existingUser = await User.findOne({email:email})
  if (existingUser == null) {
    return res.send(" We can not find any account with this email")
  }
  bcrypt.compare(password,existingUser.password,function(err,result){
    if(result){
      if(existingUser.emailVerify){
        return res.send({
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        });
      }else{
        return res.send ("Please verify your email")
      }
    }else{
        return res.send("no existing user")
    }
  })
}

module.exports = login