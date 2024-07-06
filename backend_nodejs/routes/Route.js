
const route=require("express").Router()
const UserController=require("../controllers/UserController")

route.post("/register",UserController)
route.post("/login",UserController)
route.post("/contact",UserController)

module.exports=route
