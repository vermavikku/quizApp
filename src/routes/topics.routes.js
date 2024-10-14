const express = require("express");
const router = express.Router();
const { topics } = require("../controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

router.post("/", topics.addTopicsInfo);
router.use(authMiddleware);
router.get("/", topics.getAllTopicsInfo);

module.exports = router;
