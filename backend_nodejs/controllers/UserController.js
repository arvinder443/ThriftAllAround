const User = require("../models/UserModel");
const Customer = require("../models/CustomerModel");
const Seller = require("../models/SellerModel");
const Contact = require("../models/ContactUsModel")
const bcrypt = require("bcrypt");
const saltround = 10; // Salt rounds for bcrypt
const secretKey = "0702"
const jwt = require("jsonwebtoken")

module.exports.signUp = (req, res) => {
  let validation = "";

  if (!req.body.name) {
    console.log("Name is empty");
    validation += "Enter Your Name. ";
  }
  if (!req.body.email) {
    console.log("Email is empty");
    validation += "Enter Your Email. ";
  }
  if (!req.body.password) {
    console.log("Password is empty");
    validation += "Enter Your Password. ";
  }
  if (!req.body.contact) {
    console.log("Contact is empty");
    validation += "Enter Your Contact. ";
  }
  if (!req.body.address) {
    console.log("Address is empty");
    validation += "Enter Your Address. ";
  }
  if (![2, 3].includes(parseInt(req.body.role))) { // Validate role value
    console.log("Invalid role value");
    validation += "Enter a valid Role. ";
  }

  if (validation) {
    return res.json({
      status: 400,
      success: false,
      msg: validation.trim(),
    });
  }

  User.findOne({ email: req.body.email })
    .then(uData => {
      if (!uData) {
        let userObj = new User();
        userObj.name = req.body.name;
        userObj.email = req.body.email;
        userObj.password = bcrypt.hashSync(req.body.password, saltround);
        userObj.role = parseInt(req.body.role); // Ensure role is an integer
        
        return userObj.save()
          .then(userData => {
            if (userData.role === 2) { // Role 2 is customer
              let customerObj = new Customer();
              customerObj.name = req.body.name;
              customerObj.email = req.body.email;
              customerObj.password = bcrypt.hashSync(req.body.password, saltround);
              customerObj.contact = req.body.contact;
              customerObj.address = req.body.address;
              customerObj.user_id = userData._id;

              return customerObj.save()
                .then(() => {
                  res.json({
                    status: 200,
                    success: true,
                    msg: "You registered as a customer.",
                  });
                });
            } else if (userData.role === 3) { // Role 3 is seller
              let sellerObj = new Seller();
              sellerObj.name = req.body.name;
              sellerObj.email = req.body.email;
              sellerObj.password = bcrypt.hashSync(req.body.password, saltround);
              sellerObj.contact = req.body.contact;
              sellerObj.address = req.body.address;
              sellerObj.user_id = userData._id;

              return sellerObj.save()
                .then(() => {
                  res.json({
                    status: 200,
                    success: true,
                    msg: "You registered as a seller.",
                  });
                });
            }
          });
      } else {
        res.json({
          status: 409,
          success: false,
          msg: "User already exists.",
        });
      }
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        msg: "An error occurred during registration.",
        error: err.message,
      });
    });
};







module.exports.login = async (req, res) => {
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

module.exports.contact = (req, res) => {
  const { name, email, msg } = req.body
  let validation = ""

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

  else {
    const newContact = new Contact()
    newContact.name = req.body.name
    newContact.email = req.body.email
    newContact.msg = req.body.msg
    newContact.save()
      .then(newContactPass => {
        res.json({
          status: 200,
          success: true,
          msg: newContactPass
        })
      })

      .catch(newContactFail => {
        res.json({
          status: 400,
          success: false,
          msg: newContactFail
        })
      })
  }

}
// module.exports = signUp;
// module.exports = login;
// module.exports = contact;

