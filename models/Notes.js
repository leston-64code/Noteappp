const mongoose=require("mongoose")
const User=require("../models/User")

const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        // required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Notes=mongoose.model("newnotes",notesSchema)
module.exports=Notes