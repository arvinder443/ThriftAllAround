
const mongoose=require("mongoose")
const UserSchema=new mongoose.SchemaType({
   name:{type:String,default:""},
   email:{type:String,default:""},  
   password:{type:String,default:""},
   user_type:{type:Number,default:2}, //1 for admin,2 for customer,3 for sellse  
   created_at:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("User",UserSchema)