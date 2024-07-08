
const route=require("express").Router()
const multer=require("multer")
const UserController=require("../controllers/UserController")
const CategoryController=require("../controllers/CategoryController")

// logic to upload images 
const categorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/category')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  const categoryupload = multer({ storage: categorystorage })

route.post("/register",UserController)
route.post("/login",UserController)
route.post("/contact",UserController)
route.post("/addcategory",categoryupload.single("category_image"),CategoryController.addCategory)
route.post("/getallcategory",CategoryController.getAllCategories)
route.post("/deletecategory",CategoryController.deleteCategory)
route.post("/updatecategory",CategoryController.updateCategory)

module.exports=route
