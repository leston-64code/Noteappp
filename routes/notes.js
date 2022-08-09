const express=require("express")
const router=express.Router()

const {addnote,getallnotes,updatenote,deletenote}=require("../controllers/notes")

router.route("/addnote/:userID").post(addnote)


router.route("/getallnotes").post(getallnotes)


router.route("/updatenote").post(updatenote)


router.route("/deletenote").post(deletenote)

module.exports=router