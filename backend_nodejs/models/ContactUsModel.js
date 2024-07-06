
const mongoose=require("mongoose")
const contactUsSchema=new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    msg:{type:String,default:null},
    created_at:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("Contact",contactUsSchema)