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
        // default:new Date().toLocaleString()
        default:new Date
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true,
            },

            name:{
                type:String,
                required:true
                
            },
            rating:{
                type:Number,
                required:true

            },
            comment:{
                type:String,
                required:true
            }
    }
],
})

const Notes=mongoose.model("newnotes",notesSchema)
module.exports=Notes