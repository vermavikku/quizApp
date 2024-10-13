const { userTopics } = require("../schemas");

const addUserTopic = async (data) => {
  try {
    const addUserTopic = new userTopics(data);
    const result = await addUserTopic.save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


const updateUserTopic = async (condition,data) => {
  try {
    const result = await userTopics.updateOne(condition,{$set : data});
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserTopicsByCondition = async (condition) => {
  try {
    const result = await userTopics.findOne(condition);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUSerTopics = async (condition = {}) => {
  try {
    const result = await userTopics.find(condition);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addUserTopic,
  getUserTopicsByCondition,
  getAllUSerTopics,
  updateUserTopic
};
