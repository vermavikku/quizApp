const { topics } = require("../models");
const httpStatus = require("http-status");

const addTopicsInfo = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "invalid post body" });
    }

    const result = await topics.addNewTopic(data);

    if (result) {
      return res
        .status(httpStatus.CREATED)
        .json({ Message: "topic added successfully" });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "unable to add topic" });
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("duplicate key error")) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ Message: "topic code already exists" });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const getAllTopicsInfo = async(req,res)=>{
    try {
        const result = await topics.getAllTopics();
        if(result.length == 0){
            return res.status(httpStatus.NO_CONTENT);
        }
        return res.status(httpStatus.OK).json(result);
    } catch (error) {
        return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
    }
}

module.exports = {
  addTopicsInfo,
  getAllTopicsInfo
};
