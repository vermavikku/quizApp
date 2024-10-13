const httpStatus = require("http-status");
const jwt = require("../config/jwt");


const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }
  try {
    const decoded = await jwt.verifyToken(token);

    req.userData = decoded;
    next();
  } catch (error) {
    if (error.message === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

module.exports = authMiddleware;
