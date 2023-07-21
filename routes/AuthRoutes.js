const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

/*
    POST -> Signup
*/

router.post("/signup", AuthController.signup);

module.exports = router;
