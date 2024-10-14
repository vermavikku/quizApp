const { userTopics, topics, users, questions, results } = require("../models");
const httpStatus = require("http-status");
const { ObjectId } = require("mongoose").Types;

const addUsersTopicsInfo = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "invalid post body" });
    }

    let errorVal = [];

    const topicsVal = data.topics;

    await Promise.all(
      topicsVal.map(async (element) => {
        const checkTopic = await topics.getTopicsByCondition({
          topic_code: element,
        });

        if (!checkTopic) {
          errorVal.push(element);
        }
      })
    );

    if (errorVal.length > 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: `invalid topics '${errorVal}'` });
    }

    const result = await userTopics.addUserTopic({
      ...data,
      user_email: req.userData.email,
    });

    if (result) {
      return res
        .status(httpStatus.CREATED)
        .json({ Message: "topics selected successfully" });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "something went wrong" });
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

const updateUsersTopicsInfo = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "invalid post body" });
    }

    let errorVal = [];

    const topicsVal = data.topics;

    await Promise.all(
      topicsVal.map(async (element) => {
        const checkTopic = await topics.getTopicsByCondition({
          topic_code: element,
        });

        if (!checkTopic) {
          errorVal.push(element);
        }
      })
    );

    if (errorVal.length > 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: `invalid topics '${errorVal}'` });
    }

    const result = await userTopics.updateUserTopic(
      { user_email: req.userData.email },
      { topics: data.topics }
    );

    if (result) {
      return res
        .status(httpStatus.OK)
        .json({ Message: "topics selected successfully" });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "something went wrong" });
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

const checkAnswer = async (req, res) => {
  try {
    const questionId = req.params.qid;
    const { answer } = req.body;

    if (!answer) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "please provide your answer" });
    }

    const checkQuestion = await questions.getQuestionsByCondition({
      _id: new ObjectId(questionId),
    });

    if (!checkQuestion) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ Message: "question not exists" });
    }

    let correctAnswer = { correctAnswer: checkQuestion.correct_answer };
    let userAnswer = false;

    if (answer.trim() == checkQuestion.correct_answer) {
      userAnswer = true;
    }

    return res
      .status(httpStatus.OK)
      .json({ userAnswer: userAnswer, ...correctAnswer });
  } catch (error) {
    console.log(error);

    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const userEmail = req.userData.email;
    const data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "invalid post body" });
    }

    let userAnswer;
    let finalResult = [];
    let correctAnswer = 0;
    let wrongAnswer = 0;

    await Promise.all(
      data.map(async (element) => {
        const checkQuestion = await questions.getQuestionsByCondition({
          _id: new ObjectId(element.question_id),
        });

        if (element.user_answer.trim() == checkQuestion.correct_answer) {
          correctAnswer++;
          userAnswer = true;
        } else {
          wrongAnswer++;
          userAnswer = false;
        }
        finalResult.push({
          ...element,
          correct_answer: checkQuestion.correct_answer,
          result: userAnswer,
        });
      })
    );

    const SubmitResults = {
      user_email: userEmail,
      final_answers: finalResult,
      attempted: finalResult.length,
      correct_answers: correctAnswer,
      wrong_answers: wrongAnswer,
    };

    const submitAnswer = await results.addNewResult(SubmitResults);

    if (!submitAnswer) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "unable to submit answer" });
    }

    return res
      .status(httpStatus.OK)
      .json({ Message: "answer submitted successfully" });
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

const getUsersTopics = async (req, res) => {
  try {
    const data = await userTopics.getUserTopicsByCondition({
      user_email: req.userData.email,
    });

    return res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const getResult = async (req, res) => {
  try {
    const email = req.userData.email;
    const data = await results.getResultsByCondition({ user_email: email });
    const finalResult = data[0];
    const attemptedQuestions = [];
    await Promise.all(
      finalResult.final_answers.map(async (element) => {
        const question = await questions.getQuestionsByCondition({
          _id: element.question_id,
        });
        attemptedQuestions.push({ question: question.question, ...element });
      })
    );
    return res
      .status(httpStatus.OK)
      .json({ ...finalResult, final_answers: attemptedQuestions });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const getAllResults = async (req, res) => {
  try {
    const data = await results.getAllResultsWithUser();
    return res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};
const deleteResultById = async (req, res) => {
  try {
    const email = req.userData.email;
    const condition = { user_email: email };
    const data = await results.deleteResult(condition);
    if (!data) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "unable to reset" });
    }
    return res.status(httpStatus.OK).json({ Message: "Reset Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

module.exports = {
  updateUsersTopicsInfo,
  addUsersTopicsInfo,
  checkAnswer,
  submitAnswer,
  getUsersTopics,
  getResult,
  getAllResults,
  deleteResultById,
};
