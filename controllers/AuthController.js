const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  // unique error code
  if (err.code == 11000) {
    errors.email = "This email is already exists";
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message.includes("Incorrect email")) {
    errors.email = "This email is not registered";
  }
  if (err.message.includes("Incorrect Password")) {
    errors.password = "Password is incorrect";
  }

  return errors;
};

const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "mso 1478 9632", { expiresIn: maxAge });
};

const signup = async (req, res) => {
  try {
    const customer = await User.create(req.body);
    const token = createToken(customer._id);
    res.status(201).json({
      user: { ...customer, token },
      message: "Account Created Successfully",
    });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res
      .status(400)
      .json({ errors, message: "Could not complete the signup process" });
  }
};

const login = async (req, res) => {
  try {
    const customer = await User.login(req.body);
    const token = createToken(customer._id);
    res.status(200).json({
      user: { ...customer, token },
      message: "Login Successfully",
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors, message: "User Credentials are invalid" });
  }
};

/*
  Admin Login 
*/

const adminLogin = async (req, res) => {
  try {
    const customer = await User.AdminLogin(req.body);
    const token = createToken(customer._id);
    res.status(200).json({
      user: { ...customer, token },
      message: "Login Successfully",
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors, message: "User Credentials are invalid" });
  }
};

module.exports = {
  signup,
  login,
  adminLogin,
};
