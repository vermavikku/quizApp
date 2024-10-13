const { topics } = require("../schemas");

const addNewTopic = async (data) => {
  try {
    const addTopic = new topics(data);
    const result = await addTopic.save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateTopic = async (condition,data) => {
  try {
    const result = await topics.updateOne({condition,data});
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getTopicsByCondition = async (condition) => {
  try {
    const result = await topics.findOne(condition);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllTopics = async (condition={}) => {
    try {
      const result = await topics.find(condition);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

module.exports = {
    addNewTopic,
  getTopicsByCondition,
  getAllTopics,
  updateTopic
};
