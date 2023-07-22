const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");

  if (token) {
    jwt.verify(token, "mso 1478 9632", async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Your are not authorized." });
      } else {
        const Admin = await User.findById(decodedToken.id);
        if (Admin) {
          if (Admin.role) next();
          else res.status(401).json({ message: "Your are not authorized." });
        } else {
          res.status(401).json({ message: "Your are not authorized." });
        }
      }
    });
  } else {
    res.status(401).json({ message: "Your are not authorized." });
  }
};

const requireCustomer = (req, res, next) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");

  if (token) {
    jwt.verify(token, "mso 1478 9632", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Your are not authorized." });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Your are not authorized." });
  }
};

module.exports = {
  requireAdmin,
  requireCustomer,
};
