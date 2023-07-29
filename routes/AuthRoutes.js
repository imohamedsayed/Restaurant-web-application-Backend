const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { requireAdmin } = require("../middleware/AuthMiddleware");
/*
    POST -> Signup
*/

router.post("/signup", AuthController.signup);
/*
    POST -> Login
*/
router.post("/login", AuthController.login);

/*
    POST -> Admin Login
*/
router.post("/dashboard/login", AuthController.adminLogin);

module.exports = router;
