const express = require("express");
const path = require("path");
const { isValidObjectId } = require("mongoose");
const generateOTP = require("../utils/mail");
const OTPEmailTemplate = require("../utils/otpEmail");
const VerificationEmailTemplate = require("../utils/verifyEmail");
const router = express.Router();
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const ResetToken = require("../models/ResetToken");
const createRandomBytes = require("../utils/helper");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const fs = require("fs");
const fetchuser = require("../Middlewares/Fetchuser");
const nodemailer = require("nodemailer");
const PasswordResetTemplate = require("../utils/passwordReset");
const isResetPasswordValid = require("../Middlewares/isResetPasswordValid");
const NewPasswordTemplate = require("../utils/newPassword");

//! .. for previous folder

//whenever a user hits /api/auth/ endpoint, rest of the code goes from below

//this single slash means after /api/auth

//! Route1: Creating a new user Using: POST "/api/auth/createuser". Doesn't need Authentication
router.post(
  "/createuser",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name is missing!")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must have between 3 to 20 characters"),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing!")
      .isLength({ min: 3 })
      .withMessage("Password must have atleast 3 characters!"),
    body("email", "Enter a valid email").normalizeEmail().isEmail(),
  ],
  async (req, res) => {
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
      //findOne is a mongoDB query function
      let u = await User.findOne({ email: req.body.email });
      if (u) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }
      //?creating hashed password + salt
      let salt = await bcrypt.genSalt(10); //10 characters salt
      //awaiting cuz ruk jao aur iski value leke jao
      let secPass = await bcrypt.hash(req.body.password, salt);

      //?creating a user from post request
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      let otp = generateOTP();
      await VerificationToken.create({
        owner: user._id,
        token: otp,
      });

      // Get the user's IP address
      const userIP = req.ip || req.connection.remoteAddress;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          user: "21052646@kiit.ac.in",
          pass: "bpbnyvhjzsvugatm", //got the password from google account itself inside App Passwords
        },
      });
      const filePath = path.join(__dirname, "../utils/index.html");
      const htmlContent = fs.readFileSync(filePath, "utf-8");

      const result = await transporter.sendMail({
        from: '"✨ Akshat Jaiswal ✨" <21052646@kiit.ac.in>', // sender address
        to: user.email, // list of receivers
        subject: "OTP Verification for Your Email Account", // Subject line
        text: "This email is sent using nodemailer", // plain text body
        // html: `<div>${htmlContent}</div>`, // html body
        html: OTPEmailTemplate(otp),
        attachments: [
          {
            filename: "image-1.png",
            path: path.join(__dirname, "../utils/images/image-1.png"),
            cid: "uniq-image-1.png",
          },
          {
            filename: "image-2.png",
            path: path.join(__dirname, "../utils/images/image-2.png"),
            cid: "uniq-image-2.png",
          },
          {
            filename: "image-3.png",
            path: path.join(__dirname, "../utils/images/image-3.png"),
            cid: "uniq-image-3.png",
          },
          {
            filename: "image-4.png",
            path: path.join(__dirname, "../utils/images/image-4.png"),
            cid: "uniq-image-4.png",
          },
          {
            filename: "image-5.png",
            path: path.join(__dirname, "../utils/images/image-5.png"),
            cid: "uniq-image-5.png",
          },
          {
            filename: "image-6.png",
            path: path.join(__dirname, "../utils/images/image-6.png"),
            cid: "uniq-image-6.png",
          },
          {
            filename: "image-7.png",
            path: path.join(__dirname, "../utils/images/image-7.png"),
            cid: "uniq-image-7.png",
          },
          {
            filename: "image-8.png",
            path: path.join(__dirname, "../utils/images/image-8.png"),
            cid: "uniq-image-8.png",
          },
        ],
      });

      //! Token creation
      const payload = {
        user: {
          id: user.id,
        },
      };

      //?Returning token to client after successful sign up
      //! Default algo (HMAC SHA256)
      //? jwt.sign(payload data,secret,optional algo and callback function)
      //!Using algo RS256 we need asymmetric key using OPENSSL .PEM file

      // var privateKey = fs.readFileSync("private.pem", "utf-8");
      var privateKey = "valardohaeris";

      var authtoken = jwt.sign(payload, privateKey); //using userID to generate token cuz its unique and fast retrieval from database
      // res.json(user);
      success = true;
      let ID = user._id;
      res.json({ success, authtoken, ID }); //Now if anyone gives me this token I can find the userID and with that I can find the database
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }

    //! Token verification
    // const publicKey = fs.readFileSync("public.pem", "utf-8");
    const publicKey = "valardohaeris";
    jwt.verify(authtoken, publicKey, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
      } else {
        // console.log('Decoded payload:', decoded);
      }
    });
  }
);

//! Route2: Authenticate a new user Using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error:
            "This username doesn't exist. Double-check or sign up if you're new.",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          error:
            "The password you entered is incorrect. Give it another shot or reset your password.",
        });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      var privateKey = "valardohaeris";
      var authtoken = jwt.sign(payload, privateKey);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
);

//! Route 3: Get logged in user details using POST: /api/auth/getuser. Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//! Route 4: Verify the email account
router.post("/verify-email", async (req, res) => {
  try {
    const { UserID, otp } = req.body;

    if (!UserID || !otp.trim())
      return res
        .status(500)
        .json({ error: "Invalid Request, Missing parameters!" });
    if (!isValidObjectId(UserID))
      return res.status(500).json({ error: "Invalid User ID!" });
    //Finding the User information
    const user = await User.findById(UserID);
    if (!user) return res.status(404).json({ error: "Sorry, user not found!" });
    if (user.verified == true)
      return res
        .status(500)
        .json({ error: "This account has already been verified!" });
    // console.log(user.name)
    //Finding its corresponding verification token

    const token = await VerificationToken.findOne({ owner: user._id }); //FindOne because FindbyId works only when searching _id not some other reference parameter
    if (!token)
      return res.status(404).json({ error: "Sorry, user not found!" });

    //verification by comparing the entered otp hash with stored otp hash value
    const isMatched = await token.compareToken(otp);
    if (!isMatched)
      return res.status(404).json({ error: "Please enter the correct OTP!" });
    user.verified = true;

    //Now deleting the token from database after verification

    await VerificationToken.findByIdAndDelete(token._id);

    //Saving modified user data

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: "21052646@kiit.ac.in",
        pass: "bpbnyvhjzsvugatm", //got the password from google account itself inside App Passwords
      },
    });

    await transporter.sendMail({
      from: '"✨ Akshat Jaiswal ✨" <21052646@kiit.ac.in>', // sender address
      to: user.email, // list of receivers
      subject: "Email Accound Successfully Verified", // Subject line
      html: VerificationEmailTemplate(),
      attachments: [
        {
          filename: "email.png",
          path: path.join(__dirname, "../utils/images/email.png"),
          cid: "uniq-email.png",
        },
        {
          filename: "image-5.png",
          path: path.join(__dirname, "../utils/images/image-5.png"),
          cid: "uniq-image-5.png",
        },
        {
          filename: "image-7.png",
          path: path.join(__dirname, "../utils/images/image-7.png"),
          cid: "uniq-image-7.png",
        },
        {
          filename: "image-8.png",
          path: path.join(__dirname, "../utils/images/image-8.png"),
          cid: "uniq-image-8.png",
        },
      ],
    });

    res.json({
      success: true,
      message: "Your email is verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//!Route 5: Forgot password webpage request handling

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(401).json({ error: "Please provide a valid E-mail!" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ error: "User not found, Invalid request!" });

    const token = await ResetToken.findOne({ owner: user._id });
    if (token)
      return res.status(401).json({
        error: "Only after 1 hour, you can request for another token!",
      });

    const passwordToken = await createRandomBytes();
    const resetToken = new ResetToken({
      owner: user._id,
      token: passwordToken,
    });
    await resetToken.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: "21052646@kiit.ac.in",
        pass: "bpbnyvhjzsvugatm", //got the password from google account itself inside App Passwords
      },
    });

    await transporter.sendMail({
      from: '"✨ Akshat Jaiswal ✨" <21052646@kiit.ac.in>', // sender address
      to: user.email, // list of receivers
      subject: "Reset Your iNoteBook Password", // Subject line
      html: PasswordResetTemplate(
        `https://iNoteBook-backend-platinum.onrender.com/reset-password?token=${passwordToken}&id=${user._id}`
      ),
      // html: PasswordResetTemplate(
      //   `http://localhost:3000/reset-password?token=${passwordToken}&id=${user._id}`
      // ),
      attachments: [
        {
          filename: "Beefree-logo.png",
          path: path.join(__dirname, "../utils/images/Beefree-logo.png"),
          cid: "uniq-Beefree.png",
        },
        {
          filename: "facebook2x.png",
          path: path.join(__dirname, "../utils/images/facebook2x.png"),
          cid: "uniq-facebook.png",
        },
        {
          filename: "instagram2x.png",
          path: path.join(__dirname, "../utils/images/instagram2x.png"),
          cid: "uniq-instagram.png",
        },
        {
          filename: "linkedin2x.png",
          path: path.join(__dirname, "../utils/images/linkedin2x.png"),
          cid: "uniq-linkedin.png",
        },
        {
          filename: "whatsapp2x.png",
          path: path.join(__dirname, "../utils/images/whatsapp2x.png"),
          cid: "uniq-whatsapp.png",
        },
        {
          filename: "gif-resetpass.gif",
          path: path.join(__dirname, "../utils/images/gif-resetpass.gif"),
          cid: "uniq-resetpass.gif",
        },
      ],
    });

    res.json({
      success: true,
      message: "Password Reset Link is sent to your E-mail!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//!Route 6: Reset the password with the new password entered on the webpage

router.post("/reset-password", isResetPasswordValid, async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ error: "User not found!" });

    const isSamePassword = await user.comparePassword(password); //user database aane ke baad model ke saare functions bhi ajate hain
    if (isSamePassword)
      return res.status(401).json({ error: "New password must be different!" });

    if (password.trim().length < 5)
      return res
        .status(401)
        .json({ error: "Password must be atleast 5 characters long!" });
    // Check if the password contains at least 1 uppercase letter and 1 number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;

    if (!passwordRegex.test(password.trim())) {
      return res
        .status(401)
        .json({
          error:
            "Password must contain at least 1 uppercase letter and 1 number!",
        });
    }
    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: "21052646@kiit.ac.in",
        pass: "bpbnyvhjzsvugatm", //got the password from google account itself inside App Passwords
      },
    });

    await transporter.sendMail({
      from: '"✨ Akshat Jaiswal ✨" <21052646@kiit.ac.in>', // sender address
      to: user.email, // list of receivers
      subject: "Your Password Has Been Changed", // Subject line
      html: NewPasswordTemplate(),
      attachments: [
        {
          filename: "email.png",
          path: path.join(__dirname, "../utils/images/email.png"),
          cid: "uniq-email.png",
        },
        {
          filename: "image-5.png",
          path: path.join(__dirname, "../utils/images/image-5.png"),
          cid: "uniq-image-5.png",
        },
        {
          filename: "image-7.png",
          path: path.join(__dirname, "../utils/images/image-7.png"),
          cid: "uniq-image-7.png",
        },
        {
          filename: "image-8.png",
          path: path.join(__dirname, "../utils/images/image-8.png"),
          cid: "uniq-image-8.png",
        },
      ],
    });

    res.json({
      success: true,
      message: "Password is changed!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//! Route 7: For verifying general token

router.get("/verify-token", isResetPasswordValid, async (req, res) => {
  res.json({ success: true });
});

router.post("/resend", async (req, res) => {
  try {
    let otp = generateOTP();

    const VT = await VerificationToken.findOne({ owner: req.body.ID });
    VT.token = otp;
    await VT.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: "21052646@kiit.ac.in",
        pass: "bpbnyvhjzsvugatm", //got the password from google account itself inside App Passwords
      },
    });

    const result = await transporter.sendMail({
      from: '"✨ Akshat Jaiswal ✨" <21052646@kiit.ac.in>', // sender address
      to: req.body.email, // list of receivers
      subject: "OTP Verification for Your Email Account", // Subject line
      html: OTPEmailTemplate(otp),
      attachments: [
        {
          filename: "image-1.png",
          path: path.join(__dirname, "../utils/images/image-1.png"),
          cid: "uniq-image-1.png",
        },
        {
          filename: "image-2.png",
          path: path.join(__dirname, "../utils/images/image-2.png"),
          cid: "uniq-image-2.png",
        },
        {
          filename: "image-3.png",
          path: path.join(__dirname, "../utils/images/image-3.png"),
          cid: "uniq-image-3.png",
        },
        {
          filename: "image-4.png",
          path: path.join(__dirname, "../utils/images/image-4.png"),
          cid: "uniq-image-4.png",
        },
        {
          filename: "image-5.png",
          path: path.join(__dirname, "../utils/images/image-5.png"),
          cid: "uniq-image-5.png",
        },
        {
          filename: "image-6.png",
          path: path.join(__dirname, "../utils/images/image-6.png"),
          cid: "uniq-image-6.png",
        },
        {
          filename: "image-7.png",
          path: path.join(__dirname, "../utils/images/image-7.png"),
          cid: "uniq-image-7.png",
        },
        {
          filename: "image-8.png",
          path: path.join(__dirname, "../utils/images/image-8.png"),
          cid: "uniq-image-8.png",
        },
      ],
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
