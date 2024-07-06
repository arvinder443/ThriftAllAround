const mongoose=require('mongoose')
const Sellerschema=new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    contact:{type:Number,default:0},
    address:{type:String,default:null},
    user_id:{type:mongoose.SchemaTypes.ObjectId,ref:'User',default:null},
    status:{type:Boolean,default:false},
    created_at:{type:Date,default:Date.now()},
})
module.exports=new mongoose.model("Seller",Sellerschema)