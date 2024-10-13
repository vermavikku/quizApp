const express = require("express");
const router = express.Router();
const {users} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

router.use(authMiddleware);

router.post("/topics",users.addUsersTopicsInfo);
router.put("/topics",users.updateUsersTopicsInfo);
router.post("/check/:qid",users.checkAnswer)
router.post("/answer",users.submitAnswer)
router.get("/topics",users.getUsersTopics);
router.get("/result",users.getResult);
router.get("/all/result",users.getAllResults);
router.delete("/result",users.deleteResultById)

module.exports = router;