const express = require("express");
const router = express.Router();

const {login,register,checker}=require("../controller/userController")

// Register poster
router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router;