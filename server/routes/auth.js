const express=require("express")
const router=express.Router()

const {register,login,forgotpassword,resetpassword,getuser}=require("../controllers/auth")
const {fetchuser}=require('../middlewares/fetchUser')

router.route("/register").post(register)


router.route("/login").post(login)


router.route("/forgotpassword").post(forgotpassword)


router.route("/resetpassword/:resetToken").put(resetpassword)


router.route("/getuser").post(fetchuser,getuser)


module.exports=router
