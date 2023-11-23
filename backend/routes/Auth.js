const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator")
var jwt = require('jsonwebtoken');
const fs = require('fs');
const fetchuser = require("../Middlewares/Fetchuser");

//! .. for previous folder 


//whenever a user hits /api/auth/ endpoint, rest of the code goes from below

//this single slash means after /api/auth

//! Route1: Creating a new user Using: POST "/api/auth/createuser". Doesn't need Authentication
router.post("/createuser", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must have a minimum of 5 characters").isLength({ min: 5 })
], async (req, res) => {
  // console.log(req.body); //bahar se get req jo aayegi
  // const u = User(req.body);
  // u.save(); //?For saving in mongoDB database
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Check whether the user already exists
  try {
    let u = await User.findOne({ email: req.body.email })
    if (u) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" })
    }
    //?creating hashed password + salt
    let salt = await bcrypt.genSalt(10); //10 characters salt
    //awaiting cuz ruk jao aur iski value leke jao
    let secPass = await bcrypt.hash(req.body.password, salt);


    //?creating a user from post request
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });


    //! Token creation
    const payload = {
      user: {
        id: user.id
      }
    }


    //?Returning token to client after successful sign up
    //! Default algo (HMAC SHA256)
    //? jwt.sign(payload data,secret,optional algo and callback function)
    //!Using algo RS256 we need asymmetric key using OPENSSL .PEM file

    var privateKey = fs.readFileSync('private.pem', 'utf-8');
    // var privateKey = "valardohaeris";

    var authtoken = jwt.sign(payload, privateKey, { algorithm: 'RS256' }); //using userID to generate token cuz its unique and fast retrieval from database
    // res.json(user);
    success = true;
    res.json({ success, authtoken }); //Now if anyone gives me this token I can find the userID and with that I can find the database

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
  }

  //! Token verification
  const publicKey = fs.readFileSync('public.pem', 'utf-8');
  jwt.verify(authtoken, publicKey, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
    } else {
      console.log('Decoded payload:', decoded);
    }
  });
})


//! Route2: Authenticate a new user Using: POST "/api/auth/login". No login required
router.post("/login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists()
], async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "This username doesn't exist. Double-check or sign up if you're new." })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "The password you entered is incorrect. Give it another shot or reset your password." })
    }
    const payload = {
      user: {
        id: user.id
      }
    }
    var privateKey = fs.readFileSync('private.pem', 'utf-8');
    var authtoken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    success = true;
    res.json({ success, authtoken });

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
  }
})

//! Route 3: Get logged in user details using POST: /api/auth/getuser. Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password")
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server error' });
  }

})
module.exports = router;
