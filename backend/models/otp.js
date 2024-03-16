const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../templates/email/emailVerificationTemplate");
const twilio = require("twilio");
const axios = require('axios');
const fast2sms = require('fast-two-sms');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerificationMail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email From StudyNotion",
      emailTemplate(otp)
    );
    console.log("Email sent Successfully: ", mailResponse);
    return { success: true };
  } catch (error) {
    console.log("Error Occured While Sending Mail: ", error);
    return {
      success: false,
      errorCode: "EMAIL_SEND_ERROR",
      errorMessage: "Email sending failed",
    };
  }
}

async function sendSMS(phoneNumber, otp){
  // Add code to send SMS
  const client = new twilio(process.env.TWILIO_AUTH_SID, process.env.TWILIO_AUTH_TOKEN)

  try {
    // const message = await axios.post('https://www.fast2sms.com/dev/bulkV2',{
    //   Headers:{
    //     'Content-Type': 'application/json',
    //     'authorization': process.env.FAST2SMS_AUTH_KEY
    //   },
    //   params: {
    //     authorization: process.env.FAST2SMS_AUTH_KEY,
    //     variables_values: otp,
    //     route: 'otp',
    //     numbers: phoneNumber
    //   }
    // });
    const message = await client.messages.create({
      body: `Your OTP for StudyNotion is ${otp}`,
      from: process.env.PHONE_NUMBER,
      to: `+91${phoneNumber}`
    })
    console.log("Message sent Successfully: ", message);
    return { success: true };
  } catch (error) {
    console.log("Error Occured While Sending SMS: ", error);
    return {
      success: false,
      errorCode: "SMS_SEND_ERROR",
      errorMessage: "SMS sending failed",
    };
  }
}

OTPSchema.pre("save", async function (next) {
  const email = this.email;
  const otp = this.otp;
  const phoneNumber = this.phoneNumber;

  const result = await sendSMS(phoneNumber, otp);

  if (!result.success) {
    console.error("Error during OTP SMS sending: ", result.errorMessage);
  }

  // const result = await sendVerificationMail(email, otp);
  // if (!result.success) {
  //   console.error("Error during OTP email sending: ", result.errorMessage);
  // }

  next();
});

module.exports = mongoose.model("OTP", OTPSchema);