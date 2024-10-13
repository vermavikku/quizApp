const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const topic = require('./topics.routes');
const question = require("./questions.routes");
const users = require("./users.routes");

router.use("/auth",auth);
router.use("/topic",topic);
router.use("/question",question);
router.use("/users",users);

module.exports = router;