require("dotenv").config({path:"./.env"})
const express=require("express")
const connectDB=require("./config/db")
const errorHandler=require("./middlewares/error")

const cors=require("cors")

// connect database
connectDB()

const app=express()

app.use(cors({
    origin:"https://notesapp-leston.netlify.app",
    credentials:true
}))

// app.use(cors({
//     origin:"http://localhost:3000",
//     credentials:true
// }))

app.use(express.json())

app.use("/api/auth",require("./routes/auth"))
app.use("/api/private",require("./routes/private"))
app.use("/api/notes",require("./routes/notes"))

// Error Handler  (Should be last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server=app.listen(PORT , ()=>{
    console.log("Server running on port",PORT)
})

process.on("unhandledRejection",(err,promise)=>{
    console.log(`Logged Error:${err}`)
    server.close(()=>{
        process.exit(1)
    })
})

// mongodb://localhost:27017/noteapp-authentication