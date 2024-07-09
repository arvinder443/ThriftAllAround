const User=require("../models/UserModel")

const bcrypt=require("bcrypt")
const saltRoutn=10

const adminSeeder=(req,res)=>{
    User.findOne({email:"admin6067@gmail.com"})

}

module.exports=adminSeeder