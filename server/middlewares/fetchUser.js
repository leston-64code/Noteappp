const jwt =require("jsonwebtoken")
const User=require("../models/User")

exports.fetchuser=async (req,res,next)=>{
   const token=await req.header("token")
   const data=await jwt.verify(token,process.env.JWT_SECRET)
   // console.log(data.id)
   req.userid=data.id
   let user=await User.findById(data.id)
   // console.log(user.username)
   req.username=user.username
   next()
}

