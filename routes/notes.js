const express=require("express")
const router=express.Router()

const {addnote,getallnotes,updatenote,deletenote,deleteallnotes}=require("../controllers/notes")

router.route("/addnote").post(addnote)


router.route("/getallnotes").post(getallnotes)


router.route("/deleteallnotes").post(deleteallnotes)


router.route("/updatenote").put(updatenote)


router.route("/deletenote").delete(deletenote)

module.exports=router