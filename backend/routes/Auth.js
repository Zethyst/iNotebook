const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator")
//! .. for previous folder 

//whenever a user hits /api/auth/ endpoint, rest of the code goes from below

//this single slash means after /api/auth

//Creating a new user Using: POST "/api/auth/". Doesn't need Authentication
router.post("/", [
    body("name", "Name must be of atleast 5 characters").isLength({ min: 5 }),
    body("password", "PPassword must have a minimum of 5 characters").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail()
], async (req, res) => {
    // console.log(req.body); //bahar se get req jo aayegi
    // const u = User(req.body);
    // u.save(); //?For saving in mongoDB database
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        res.json(user);
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error
          return res.status(400).json({ error: 'Email already exists' });
        }
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // }).then(user => res.json(user)).catch(err => {console.log(err)
    // res.json({error:"Please enter a unique value for email",message:err.message})});
    // res.send("Hello Duniya")
})

module.exports = router;
