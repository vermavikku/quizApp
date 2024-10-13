const { questions, topics, userTopics } = require("../models");
const httpStatus = require("http-status");

const addQuestionsInfo = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "invalid post body" });
    }

    const checkTopic = await topics.getTopicsByCondition({
      topic_code: data.topic_code,
    });

    if (!checkTopic) {
      return res.status(httpStatus.NOT_FOUND).json({
        Message: `topic with code '${data.topic_code}' this not exists`,
      });
    }

    const result = await questions.addNewQuestion(data);

    if (result) {
      return res
        .status(httpStatus.CREATED)
        .json({ Message: "question added successfully" });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "unable to add question" });
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("duplicate key error")) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ Message: "duplicate data" });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const getAllQuestionsByTopics = async (req, res) => {
  try {
    const topics = await userTopics.getUserTopicsByCondition({
      user_email: req.userData.email,
    });

    if (!topics) {
      return res.status(httpStatus.NOT_FOUND).json({ Message: "invalid user" });
    }

    console.log(topics.topics);
    

    const condition = { topic_code: { $in: topics.topics } };

    const result = await questions.getAllQUestions(condition);

    if (result.length == 0) {
      return res.status(httpStatus.NO_CONTENT);
    }

    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

module.exports = {
  addQuestionsInfo,
  getAllQuestionsByTopics,
};
