const express = require("express");
const router = express.Router();
const {topics} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

router.use(authMiddleware);

router.post("/",topics.addTopicsInfo);
router.get("/",topics.getAllTopicsInfo)

module.exports = router;