const User = require("../models/UserModel");
const Customer = require("../models/CustomerModel");
const Seller = require("../models/SellerModel");
const Contact=require("../models/ContactUsModel")
const bcrypt = require("bcrypt");
const saltround = 10; // Salt rounds for bcrypt
const secretKey="0702"
const jwt=require("jsonwebtoken")

const register = async (req, res) => {
  const { name, email, password, contact, address, role } = req.body;
  let validation = "";

  if (!name) validation += "Enter Your Name. ";
  if (!email) validation += "Enter email. ";
  if (!password) validation += "Enter password. ";
  if (!contact && (role === "customer" || role === "seller")) validation += "Enter contact. ";
  if (!address && (role === "customer" || role === "seller")) validation += "Enter address. ";

  if (validation) {
    return res.status(400).json({
      status: 400,
      success: false,
      msg: validation.trim(),
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        success: false,
        msg: "User already exists.",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, saltround);

    // Save user in User table
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // If role is customer, also save in Customer table
    if (role === "customer") {
      const newCustomer = new Customer({
        name,
        email,
        password: savedUser.password, // Store hashed password from User model
        contact,
        address,
        user_id: savedUser._id, // Reference to User model
      });
      await newCustomer.save();
    }

    // If role is seller, also save in Seller table
    if (role === "seller") {
      const newSeller = new Seller({
        name,
        email,
        password: savedUser.password, // Store hashed password from User model
        contact,
        address,
        user_id: savedUser._id, // Reference to User model
      });
      await newSeller.save();
    }

    res.status(200).json({
      status: 200,
      success: true,
      msg: "User registered successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      success: false,
      msg: String(err),
    });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  let validation = "";

  if (!email) validation += "Enter email. ";
  if (!password) validation += "Enter password. ";

  if (validation) {
    return res.status(400).json({
      status: 400,
      success: false,
      msg: validation.trim(),
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        msg: "Invalid email or password.",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        success: false,
        msg: "Invalid email or password.",
      });
    }

    // Generate JWT token 
    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
      expiresIn: '10h', // Token expires in 10 hour
    });

    res.status(200).json({
      status: 200,
      success: true,
      msg: "Login successful.",
      token, // Return the token to the client
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      msg: String(err),
    });
  }
};

const contact=(req,res)=>{
  const {name,email,msg}=req.body
  let validation=""
  
  if (!name) validation += "Enter your name. ";
  if (!email) validation += "Enter your email. ";
  if (!msg) validation += "Enter your message. ";

  if (validation) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: validation.trim(),
      });
    }

  else

  {
      const newContact=new Contact()
      newContact.name=req.body.name
      newContact.email=req.body.email
      newContact.msg=req.body.msg
      newContact.save()
      .then(newContactPass=>{
          res.json({
              status:200,
              success:true,
              msg:newContactPass
          })
      })

      .catch(newContactFail=>{
          res.json({
              status:400,
              success:false,
              msg:newContactFail
          })
      })
  }
  
}
module.exports = register;
module.exports = login;
module.exports = contact;

