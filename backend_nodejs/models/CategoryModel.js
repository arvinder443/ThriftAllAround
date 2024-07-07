const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema({
    category_name:{type:String,defualt:null},
    description:{type:String,defualt:null},
    image:{type:String,defualt:null},
    created_at:{type:Date,default:Date.now()}

})

module.exports=new mongoose.model("Category",categorySchema)