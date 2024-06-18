
const express=require("express")
const index=express()
const cors = require("cors")
index.use(cors())
require("./config/Db")
index.use(express.urlencoded({'extended':true}))
index.use(express.json({ limit:'500mb'}))

index.get("/",(req,res)=>{
    res.json({
        msg:"it is working"
    })
})

index.listen(3000,()=>{
    console.log("The port number is 3000")
})