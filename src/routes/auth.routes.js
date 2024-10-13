const express = require("express");
const router = express.Router();
const {auth} = require("../controllers");

router.post("/register",auth.addUserInfo);
router.post("/login",auth.loginUser);

module.exports = router;