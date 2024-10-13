const { results } = require("../schemas");

const addNewResult = async (data) => {
  try {
    const addResult = new results(data);
    const result = await addResult.save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getResultsByCondition = async (condition) => {
  try {
    const result = await results.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_email",
          foreignField: "email",
          as: "users"
        }
      },
      {
        $unwind: "$users"
      },
      {
        $match: {          
          "users.email": condition.user_email
        }
      }]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllResultsWithUser= async () => {
  try {
    const result = await results.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_email",
          foreignField: "email",
          as: "users"
        }
      },
      {
        $unwind: "$users" 
      },
      {
        $sort : {correct_answers : -1}
      }
     ]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


const getAllResults = async (condition={}) => {
    try {
      const result = await results.find(condition);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteResult = async(condition)=>{
    try {
      const result = await results.deleteOne(condition);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

module.exports = {
    addNewResult,
    getResultsByCondition,
    getAllResults,
    getAllResultsWithUser,
    deleteResult
};
