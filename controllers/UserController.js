const User = require("../models/User");
const fs = require("fs");
const path = require("path");

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

  if (err.message.includes("Incorrect old Password")) {
    errors.password = "old Password is wrong ..!!";
  }

  return errors;
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      const imageName = user.image.substring(7);
      if (imageName != "user.jpg") {
        fs.unlinkSync(path.join(__dirname, "../uploads/images/" + imageName));
      }
      res
        .status(200)
        .json({ user, message: "User's account deleted successfully" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errors: err, message: "Something went wrong, try again later" });
  }
};

const hireAsAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      role: 1,
    });
    if (user) {
      res
        .status(200)
        .json({ user, message: "User hired successfully as an admin" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong, try again later",
    });
  }
};

const usersStats = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      stats: {
        number: users.length,
      },
    });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong, try again later",
    });
  }
};

const changeName = async (req, res) => {
  const id = res.locals.userId;

  try {
    const user = await User.findByIdAndUpdate(id, {
      name: req.body.name,
    });
    res.status(200).json({ user, message: "User name updated successfully" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const changeEmail = async (req, res) => {
  const id = res.locals.userId;
  try {
    const user = await User.findByIdAndUpdate(id, {
      email: req.body.email,
    });
    res.status(200).json({ user, message: "email updated successfully" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors, message: "Failed to update email" });
  }
};
const changePassword = async (req, res) => {
  const id = res.locals.userId;

  try {
    const user = await User.changePassword({
      id,
      oldPassword: req.body.oldPass,
      newPassword: req.body.newPass,
    });
    res.status(200).json({ user, message: "Password changed successfully" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors, message: "Failed to update password" });
  }
};
const changePicture = async (req, res) => {
  const id = res.locals.userId;
  const path = req.file.path.substring(
    req.file.path.lastIndexOf("\\images") + 1
  );

  try {
    const user = await User.findByIdAndUpdate(id, {
      image: path,
    });
    res.status(200).json({
      user: user,
      image: path,
      message: "Profile picture has been updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: err.message,
      message: "Something went wrong, please try again later.",
    });
  }
};
module.exports = {
  getUsers,
  deleteAccount,
  hireAsAdmin,
  usersStats,
  changeName,
  changeEmail,
  changePassword,
  changePicture,
};
