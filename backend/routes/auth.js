const express = require("express");
const router = express.Router();

const {signUpPhone,loginUsingPhoneNumber,sendOTPPhone, changePasswordPhone, forgotPasswordPhone} = require('../controllers/authPhone')

const {sendOTP} = require('../controllers/auth')

const {verifyOTPEmail, verifyOTPPhone} = require('../controllers/otp')

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");

const { auth } = require("../middlewares/middleware");


router.post("/sendOTPPhone", sendOTPPhone);
router.post('/sendOTP', sendOTP)
router.post("/verifyOTPPhone", verifyOTPPhone);
router.post('/verifyOTPEmail', verifyOTPEmail)

router.post("/signUp", signUpPhone);
router.post('/login',loginUsingPhoneNumber)
router.put("/changePassword", auth, changePasswordPhone);
router.post('/forgotPassword',forgotPasswordPhone)

router.post("/reset-Password-Token", resetPasswordToken);
router.post("/reset-Password", resetPassword);

module.exports = router;