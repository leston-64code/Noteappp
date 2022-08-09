const jwt =require("jsonwebtoken")

exports.fetchuser=async (req,res,next)=>{
   const token=await req.header("token")
   const data=await jwt.verify(token,process.env.JWT_SECRET)
   console.log(data.id)
   req.userid=data.id
   next()
}

