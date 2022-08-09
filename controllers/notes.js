const Notes=require("../models/Notes")


exports.addnote=async(req,res,next)=>{
    const {title,description,tag}=req.body
   try {
    const user=req.header("userID")
    const note=await Notes.create({
       user, title,description,tag
    })
    if(note){
        return res.status(200).json({
            success:true,
            note
        })
    }

   } catch (error) {
    next(error)
   }
}
exports.getallnotes=async(req,res,next)=>{

}
exports.deletenote=async(req,res,next)=>{

}
exports.updatenote=async(req,res,next)=>{

}
