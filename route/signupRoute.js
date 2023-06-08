const express = require("express");
const { signupValidator } = require("../utility/validators/signupValidator");
const { signup, login } = require("../services/authServices");
const { loginValidator } = require("../utility/validators/loginValidator");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);
module.exports = router;
