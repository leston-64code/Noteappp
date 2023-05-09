const express=require("express")
const router=express.Router()

const {addnote,getallnotes,updatenote,deletenote,deleteallnotes, updateAllNotes}=require("../controllers/notes")

router.route("/addnote").post(addnote)


router.route("/getallnotes").post(getallnotes)


router.route("/deleteallnotes").delete(deleteallnotes)


router.route("/updatenote").put(updatenote)


router.route("/deletenote").delete(deletenote)


router.route("/updatemany").put(updateAllNotes)

module.exports=router