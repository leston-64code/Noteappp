const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto=require("crypto")

exports.register = async (req, res, next) => {
  const { username, email, password } = await req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email or password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    sendToken(user, 200, res);
  } catch (error) {
        return next(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  const { email } = await req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Please enter valid email"), 404);
    }

    const resetToken = user.getResetPasswordToken();
    
    await user.save();

    const resetURL = `https://noteapp-leston-64code.netlify.app/resetpassword/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to the link to reset your password</p>
       
        <a href=${resetURL} clicktracking=off><button style="background-color: cornflowerblue;padding: 15px;border-radius: 9px;width: 150px;font-size: large;color:black;margin: auto;">Reset Password</button></a>
        `;

    try {
      sendEmail({
        to: user.email,
        subject: "Password Reset Token",
        html: message,
      });

      return res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    }
    await user.save();

    return next(new ErrorResponse("Email could not be send", 500));
  } catch (error) {
    return next(error);
  }
};

exports.resetpassword =async (req, res, next) => {
  const resetPasswordToken=crypto.createHash("sha256").update(req.params.resetToken).digest("hex")
  

  try {
    const user=await User.findOne({resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}})
    
    if(!user){
      return next (new  ErrorResponse("Invalid reset Tokken",400))
    }
    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined

    await user.save()

    res.status(201).json({
      success:true,
      data:"Password reset successful"
    })
  } catch (error) {
    next(error)
  }
};

exports.getuser=async (req,res,next)=>{
  const id=req.userid
  const username=req.username
  return res.json({
    success:"true",
    message:"Logged in successfully",
    newer:id,
    username
  })
}


const sendToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    message:"You logged in successfylly"
  });
};
