const express =require('express')
const cors=require("cors")
const cookieParser = require('cookie-parser')
require('dotenv').config()
const router=require('./routes/index')
const app=express()
const PORT=8000  ||process.env.PORT
const mongoose =require("mongoose")
// const connectDB=require('./config/db')

app.use(cors(
    {
        origin:process.env.FRONTEND_URL,
        credentials:true
    }
))

app.use(express.json())
app.use(cookieParser())


app.use('/api',router)
mongoose.connect("mongodb://localhost:27017/ecommerce").then((e) =>{ console.log("MongoDB Connected")});

// mongoose.connect("mongodb://localhost:27017/")
app.listen(PORT,()=>{
    console.log("server is stared")
})
// connectDB().then(app.listen(PORT,()=>{
//     console.log("Server is running succesfully")
// }))
 
 