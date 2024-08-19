const route = require("express").Router();
const multer = require("multer");
const fs = require('fs');
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");

// Logic to upload images
const categorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = './public/category';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      console.log(file);
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});
const categoryupload = multer({ storage: categorystorage });

route.post("/signup", UserController.signUp);
route.post("/login", UserController.login);
route.post("/contact", UserController.contact); 
route.post("/addcategory", categoryupload.single("category_image"), CategoryController.addCategory);
route.get("/getallcategory", CategoryController.getAllCategories); 
route.post("/deletecategory", CategoryController.deleteCategory);
route.post("/updatecategory", CategoryController.updateCategory);

module.exports = route;
