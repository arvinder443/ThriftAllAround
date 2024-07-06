const User = require("../models/UserModel");
const Customer = require("../models/CustomerModel");
const Seller = require("../models/SellerModel");
const bcrypt = require("bcrypt");
const saltround = 10; // Salt rounds for bcrypt

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
        userId: savedUser._id, // Reference to User model
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
        userId: savedUser._id, // Reference to User model
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

module.exports = register;
