const express = require("express");
const router = express.Router();
const {questions} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

router.use(authMiddleware);

router.post("/",questions.addQuestionsInfo);
router.get("/",questions.getAllQuestionsByTopics);

module.exports = router;