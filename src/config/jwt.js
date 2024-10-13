const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET_KEY || "vikas";

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          reject(new Error("Token has expired"));
        } else {
          reject(new Error("Invalid token"));
        }
      } else {
        resolve(decoded);
      }
    });
  });
};

function generateToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "1h" }); 
}

module.exports = {
  generateToken,
  verifyToken,
};
