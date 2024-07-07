const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema({
    category_name:{type:String,defualt:null},
    category_description:{type:String,defualt:null},
    category_image:{type:String,defualt:null},
    created_at:{type:Date,default:Date.now()}

})

module.exports=new mongoose.model("Category",categorySchema)