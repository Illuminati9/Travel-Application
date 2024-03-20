const User = require('../models/user')
const OTPPhone = require('../models/otpPhone')
const Profile = require('../models/profile')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();

const generateOTP = async () => {
    let otp;
    do {
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
    } while (await OTPPhone.findOne({ otp: otp }));
    return otp;
};

exports.sendOTPPhone = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const phoneNumberPattern = /^\d{10}$/;

        if (!phoneNumberPattern.test(phoneNumber)) {
            return res.status(400).json({ success: false, message: "Invalid Phone Number" });
        }

        const otp = await generateOTP();
        console.log('otp generated', otp);

        const newOTP = await OTPPhone.create({ phoneNumber, otp });

        res.status(200).json({ success: true, message: "OTP Sent Successfully to registered mobile number" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message, success: false, message: "Internal Server Error" });
    }
}

exports.signUpPhone = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phoneNumber,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(400).json({
                success: false,
                message: "Please Fill in all the Required Fields to Sign up.",
            });
        }

        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Phone Number",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not Match. Please Try Again.",
            });
        }

        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Phone Number is Already Registered.",
            });
        }

        const otpDigits = /^\d{6}$/;
        if (!otpDigits.test(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP format. OTP should be a 6-digit number.",
            });
        }

        const recentOTP = await OTPPhone.findOne({ phoneNumber })
            .sort({ createdAt: -1 })
            .limit(1);
        if (!recentOTP || (recentOTP.length > 0 && recentOTP[0].otp !== otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }

        const passwordPattern =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password Must be at least 8 characters long and Include at least one Uppercase Letter, one Lowercase Letter, one Digit, and one Special Character.",
            });
        }

        if (accountType == 'ADMIN') {
            return res.status(400).json({
                success: false,
                message: "Invalid Account Type",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            // gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            phoneNumber,
            password: hashedPassword,
            accountType,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            additionalDetails: profileDetails._id
        });

        const userPayload = await User.findOne({ _id: user._id }, { password: 0 });

        return res.status(200).json({
            success: true,
            message: "User is Registered Successfully",
            user: userPayload,
        });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({
            success: false,
            message: "User Cannot be Registered. Please Try Again.",
            error: error.message,
        });
    }
};


exports.loginUsingPhoneNumber = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        if (!phoneNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please Provide Both Phone Number and OTP to Login.",
            });
        }

        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number format",
            });
        }

        const otpDigits = /^\d{6}$/;
        if (!otpDigits.test(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP format. OTP should be a 6-digit number.",
            });
        }

        const recentOTP = await OTPPhone.findOne({ phoneNumber })
            .sort({ createdAt: -1 })
            .limit(1);
        if (!recentOTP || (recentOTP.length > 0 && recentOTP[0].otp !== otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials. User is not Registered. Please Sign up.",
            });
        }

        if (user.token) {
            return res.status(401).json({
                success: false,
                message: "User is Already logged in.",
            });
        }

        const payload = {
            phoneNumber: user.phoneNumber,
            id: user._id,
            accountType: user.accountType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in Successfully.",
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Logging in",
            error: error.message,
        })
    }
}

exports.changePasswordPhone = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword, otp } = req.body;
        const userId = req.user.id;
        const phoneNumber = req.user.phoneNumber;
        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Phone Number",
            });
        }

        const otpPattern = /^\d{6}$/;
        if (!otpPattern.test(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP format. OTP should be a 6-digit number.",
            });
        }

        const recentOTP = await OTPPhone.findOne({ phoneNumber })
            .sort({ createdAt: -1 })
            .limit(1);

        if (!recentOTP || (recentOTP.length > 0 && recentOTP[0].otp !== otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not Match. Please Try Again.",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Old Password",
            });
        }

        const isMatch2 = await bcrypt.compare(newPassword, user.password);
        if (isMatch2) {
            return res.status(400).json({
                success: false,
                message: "New Password cannot be same as Old Password",
            });
        }

        const passwordPattern =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordPattern.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password Must be at least 8 characters long and Include at least one Uppercase Letter, one Lowercase Letter, one Digit, and one Special Character.",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Changing Password",
            error: error.message,
        })
    }
}


exports.forgotPasswordPhone = async (req,res)=>{
    try {
        const {password, confirmPassword,otp,phoneNumber} = req.body;

        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Phone Number",
            });
        }

        const otpPattern = /^\d{6}$/;
        if (!otpPattern.test(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP format. OTP should be a 6-digit number.",
            });
        }

        const recentOTP = await OTPPhone.findOne({ phoneNumber })
            .sort({ createdAt: -1 })
            .limit(1);
        
        if (!recentOTP || (recentOTP.length > 0 && recentOTP[0].otp !== otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not Match. Please Try Again.",
            });
        }

        const user = await User.findOne({phoneNumber});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        const passwordPattern =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password Must be at least 8 characters long and Include at least one Uppercase Letter, one Lowercase Letter, one Digit, and one Special Character.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Forgot Password Method",
            error: error.message,
        })
    }
}