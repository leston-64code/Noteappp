const express=require("express")
const router=express.Router()

const {addnote,getallnotes,updatenote,deletenote,deleteallnotes}=require("../controllers/notes")

router.route("/addnote").post(addnote)


router.route("/getallnotes").post(getallnotes)


router.route("/deleteallnotes").post(deleteallnotes)


router.route("/updatenote").post(updatenote)


router.route("/deletenote").post(deletenote)

module.exports=router