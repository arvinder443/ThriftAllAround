const User=require("../models/UserModel")

const bcrypt=require("bcrypt")
const saltRoutd=10
exports.adminSeeder=(req,res)=>{
    User.findOne({email:"admin6067@gmail.com"})
    .then(adminData=>{
        if(adminData==null)
        {
            const adminObj=new User()
            adminObj.name="admin"
            adminObj.email="admin6067@gmail.com"
            adminObj.password=bcrypt.hashSync("avi0702",saltRoutd)
            adminObj.role=1;
            adminObj.save()
            console.log("Admin registered")
        }
        else
        {
            console.log("Error registering admin")
        }
    })

}

