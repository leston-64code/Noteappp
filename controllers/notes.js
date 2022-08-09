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
    try {
        const userID=req.header("userID")
        if(userID==undefined){
            return res.status(404).json({
                success:false,
                message:"Please login to get your notes"
            })
        }
        const notes=await Notes.find({user:userID})
        if(!notes){
            return res.status(404).json({
               success:false,
               message:"No notes found"
            })
          }        

       if(notes){
       return res.status(200).json({
            success:true,
            notes
        })
       }
      
    } catch (error) {
        next(error)
    }
    
}
exports.deletenote=async(req,res,next)=>{

}
exports.updatenote=async(req,res,next)=>{

}
