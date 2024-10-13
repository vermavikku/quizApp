const { users } = require("../models");
const httpStatus = require("http-status");
const { encrypt, verify } = require("../config/crypto");
const { generateToken } = require("../config/jwt");

const addUserInfo = async (req, res) => {
  try {
    const { password, ...data } = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "invalid post body" });
    }

    const encryptedPass = await encrypt(password);
    const result = await users.addNewUser({ ...data, password: encryptedPass });
    if (result) {
      return res
        .status(httpStatus.CREATED)
        .json({ Message: "user register successfully" });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "unable to register" });
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("duplicate key error")) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ Message: "email already exists" });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;    

    const checkEmail = await users.getUserByCondition({ email: email });

    if (!checkEmail) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: "invalid email or password" });
    }

    const verifyPass = await verify(password, checkEmail.password);

    if (!verifyPass) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: "invalid email or password" });
    }

    const userPayload = {
      email: checkEmail.email,
    };

    const token = await generateToken(userPayload);

    return res.status(httpStatus.OK).json({ token: token,name:checkEmail.name });
  } catch (error) {
    console.log(error.message);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

module.exports = {
  addUserInfo,
  loginUser
};
