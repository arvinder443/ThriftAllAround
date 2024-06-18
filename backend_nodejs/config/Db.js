
const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/thriftAllAround")
.then(res=>{
    console.log("Db connected")
})
.catch(err=>{
    console.log(" Error in db connection",err)

})