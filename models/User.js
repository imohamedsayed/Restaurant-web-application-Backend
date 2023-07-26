const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Invalid Email Address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  image: {
    type: String,
    default: "images\\user.jpg",
  },
  role: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.statics.login = async function ({ email, password }) {
  const customer = await User.findOne({ email: email });
  if (customer) {
    const passwordFlag = await bcrypt.compare(password, customer.password);
    if (passwordFlag) {
      return customer;
    }
    throw Error("Incorrect Password");
  } else {
    throw Error("Incorrect email");
  }
};
UserSchema.statics.AdminLogin = async function ({ email, password }) {
  const customer = await User.findOne({ email: email, role: 1 });
  if (customer) {
    const passwordFlag = await bcrypt.compare(password, customer.password);
    if (passwordFlag) {
      return customer;
    }
    throw Error("Incorrect Password");
  } else {
    throw Error("Incorrect email");
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
