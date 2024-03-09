const express = require("express");
const router = express.Router();

const {
  sendOTP,
  signUp,
  login,
  changePassword,
} = require("../controllers/auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");

const { auth } = require("../middlewares/middleware");

/**
     * @openapi
     * '/api/v1/auth/sendOTP':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: OTP to register as a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *            properties:
     *              email:
     *                type: string
     *                default: johndoe@gmail.com
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad Request
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/sendOTP", sendOTP);
/**
     * @openapi
     * '/api/v1/auth/signUp':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Register as a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - firstName
     *              - lastName
     *              - email
     *              - password
     *              - confirmPassword
     *              - accountType
     *              - otp
     *            properties:
     *              firstName:
     *                type: string
     *                default: johndoe
     *              lastName:
     *                type: string
     *                default: john
     *              email:
     *                type: string
     *                default: johndoe@gmail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *              confirmPassword:
     *               type: string
     *              default: johnDoe20!@
     *              accountType:
     *                type: string
     *                default: USER
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad Request
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/signUp", signUp);
/**
     * @openapi
     * '/api/v1/auth/login':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Login as a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - password
     *            properties:
     *              email:
     *                type: string
     *                default: johndoe
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/login", login);
router.post("/changePassword", auth, changePassword);

router.post("/reset-Password-Token", resetPasswordToken);
router.post("/reset-Password", resetPassword);

module.exports = router;