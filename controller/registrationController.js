const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const User = require ("../models/userModels")

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || name ==undefined ) {
    return res.send("name required");
  }
  if (!email || email==undefined) {
    return res.send("email required");
  }
  if (!password || password == undefined) {
    return res.send("password required");
  }


  let existingUser = await User.findOne({email:email})
  if (existingUser != null) {
    return res.send("already exists")
  }
 
      bcrypt.hash(password, 10, async function(err,hash){
        
        const user = new User({
          name: name,
          email: email,
          password: hash,
        });
    
        await user.save(); 
    
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASSWORD,          },
        });
        
          const info = transporter.sendMail({
            from: 'myBlog', // sender address
            to: user.email, // list of receivers
            subject: "Email Verification link", // Subject line
            html: `<body style=font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f7f7f7><div style="max-width:600px;margin:50px auto;background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.1)"><div style="text-align:center;padding-bottom:20px;border-bottom:1px solid #e0e0e0;background-color:#be8ae9"><h1 style=margin:0;color:#333;padding-top:10px>Email Verification</h1></div><div style=padding:20px;text-align:center><p style=font-size:16px;color:#666>Hi ${user.name},<p style=font-size:16px;color:#666>Thank you for signing up for BlogApp. Please verify your email address by clicking the button below:</p><a href="http://localhost:8000/${user.email} "style="display:inline-block;margin-top:20px;padding:12px 25px;background-color:#2aa00d;color:#fff;text-decoration:none;border-radius:5px;font-size:16px">Verify Email</a><p style=font-size:16px;color:#666>If you did not create an account with us, please ignore this email.</div><div style="text-align:center;padding-top:20px;border-top:1px solid #e0e0e0;font-size:12px;color:#999"><p>© 2020 BlogApp. All rights reserved.</div></div>`, // html body
          });
        
    
        return res.json({
          message: "Registration successful",
          id: user._id,
          name: user.name,
          email: user.email,
        });

      })
};

module.exports = registrationController;
