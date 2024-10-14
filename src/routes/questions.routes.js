const express = require("express");
const router = express.Router();
const { questions } = require("../controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

router.post("/", questions.addQuestionsInfo);
router.use(authMiddleware);
router.get("/", questions.getAllQuestionsByTopics);

module.exports = router;
