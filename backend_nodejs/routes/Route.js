
const route=require("express").Router()
const UserController=require("../controllers/UserController")

route.post("/register",UserController)

module.exports=route
