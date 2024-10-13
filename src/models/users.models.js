const { users } = require("../schemas");

const addNewUser = async (data) => {
  try {    
    const addUser = new users(data);
    const result = await addUser.save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByCondition = async (condition) => {
  try {
    const result = await users.findOne(condition);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addNewUser,
  getUserByCondition,
};
