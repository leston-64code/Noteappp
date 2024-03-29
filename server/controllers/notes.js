const Notes=require("../models/Notes")
const ErrorResponse = require("../utils/errorResponse");

exports.addnote=async(req,res,next)=>{
    const {title,description,tag}=req.body
   try {
    if(!title ||!description){
        return next(new ErrorResponse("Please enter title or description",404))
    }
    const user=req.header("userID")
    if(!user){
        return next(new ErrorResponse("Please login if you are not logged in",44))
    }
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
   return  next(error)
   }
}
exports.getallnotes=async(req,res,next)=>{
    try {
        const userID=await req.header("userID")
        if(userID==undefined || !userID){
            return next(new ErrorResponse("Please login to get your notes",404))
        }
        const notes=await Notes.find({user:userID})
        if(!notes){
            return next(new ErrorResponse("Notes not found ",404))
          }        

       if(notes){
       return res.status(200).json({
            success:true,
            count:notes.length,
            notes,           
        })
       }
      
    } catch (error) {
        next(error)
    }
    
}
exports.deleteallnotes=async(req,res,next)=>{
    try {
        const userID=req.header("userID")
        if(userID==undefined){
            return res.status(404).json({
                success:false,
                message:"Please login to get your notes"
            })
        }
        let notes=await Notes.find({user:userID})
        if(!notes){
            return res.status(404).json({
               success:false,
               message:"No notes found"
            })
          }        

       if(notes){
        let count=notes.length
        for (let k of notes){
            notes=await Notes.findOneAndRemove(k._id)
        }

       return res.status(200).json({
            success:true,
            count,
            notes
        })
       }
       
      
    } catch (error) {
        next(error)
    }
    
}
exports.deletenote=async(req,res,next)=>{
   
    try {
        const noteID=req.header("noteID")
        if(!noteID){
            res.status(404).json({
                success:true,
                message:"Valid note ID note found"
            })
        }
        const deletedNote=await Notes.findByIdAndDelete(noteID)
        if(!deletedNote){
            res.status(404).json({
                success:false,
                message:"Please selete a valid note"
            })
        }
        if(deletedNote){
            res.status(200).json({
                success:true,
                deletedNote
            })
        }
    } catch (error) {
        next(error)
    }
}
exports.updatenote=async(req,res,next)=>{
    const {title,description,tag}=req.body
    try {
        if(!title || !description){
            return next(new ErrorResponse("Please enter title or description ",404))
        }
        if(title&&description){
            let newerNote={
                title,description,tag
            }
            let noteID=await req.header("noteID")
            if(!noteID){
                return next(new ErrorResponse("Please select a valid note to delete",404))
            }
           if(noteID){
            let note=await  Notes.findByIdAndUpdate(noteID,{$set:newerNote},{new:true})
            return res.status(200).json({
                success:true,
                note
            })
           }
        }
    } catch (error) {
       return next(error)
    }
}
exports.updateAllNotes=async (req,res, next)=>{
    try {

        const allupdatenote=await Notes.updateMany({},{$set:{numOfReviews:0, reviews:[]}})
        return res.status(200).json({
            "success":true,
            allupdatenote
        })

    } catch (error) {
        return next(new ErrorResponse(error,error.status))
    }
}
