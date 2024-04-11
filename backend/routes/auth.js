const express = require("express");
const router = express.Router();

const { signUpPhone, loginUsingPhoneNumber, sendOTPPhone, changePasswordPhone, forgotPasswordPhone } = require('../controllers/authPhone')

const { sendOTP } = require('../controllers/auth')

const { verifyOTPEmail, verifyOTPPhone } = require('../controllers/otp')

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");

const { resetPasswordTokenPhone, resetPasswordPhone } = require('../controllers/resetPasswordPhone')

const { auth } = require("../middlewares/middleware");

router.get('/hello', async (req, res) => {
  try {
    console.log(req.body.hello.hello);
    return res.status(200).json({
      success: true,
      message: "Hello World"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "An Error Occurred",
      error: error.message
    })
  }
})

router.post("/sendOTPPhone", sendOTPPhone);
router.post('/sendOTP', sendOTP)
router.post("/verifyOTPPhone", verifyOTPPhone);
router.post('/verifyOTPEmail', verifyOTPEmail)

router.post("/signUp", signUpPhone);
router.post('/login', loginUsingPhoneNumber)
router.put("/changePassword", auth, changePasswordPhone);
router.post('/forgotPassword', forgotPasswordPhone)

router.post("/reset-Password-Token", resetPasswordToken);
router.post("/reset-Password", resetPassword);

router.post("/reset-Password-Token-Phone", resetPasswordTokenPhone);
router.post("/reset-Password-Phone", resetPassword);

module.exports = router;