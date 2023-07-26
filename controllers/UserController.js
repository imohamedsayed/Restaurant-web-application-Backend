const User = require("../models/User");
const fs = require("fs");
const path = require("path");

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

module.exports = {
  getUsers,
  deleteAccount,
  hireAsAdmin,
  usersStats,
};
