const { questions } = require("../schemas");

const addNewQuestion = async (data) => {
  try {
    const addQuestion = new questions(data);
    const result = await addQuestion.save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getQuestionsByCondition = async (condition) => {
  try {
    const result = await questions.aggregate([
      { $match: condition },
      { $sample: { size: 100 } },
    ]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllQUestions = async (condition = {}) => {
  try {
    const result = await questions.find(condition);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addNewQuestion,
  getQuestionsByCondition,
  getAllQUestions,
};
