const mongoose = require("mongoose");
require("dotenv").config();

const uri =
  "mongodb://admin:qS8O3hOGVIPzhwlG@SG-tarry-squash-5982-67667.servers.mongodirector.com:27017/admin";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: false,
  connectTimeoutMS: 5000,
};

const connectWithRetry = (retries = 5, delay = 5000) => {
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.error("Connection error for DB:", err);
      if (retries > 0) {
        console.log(`Retrying connection in ${delay / 1000} seconds...`);
        setTimeout(() => connectWithRetry(retries - 1, delay), delay);
      } else {
        console.error("Could not connect to DB after multiple attempts");
      }
    });
};

connectWithRetry();

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error for DB"));
db.once("open", function () {
  console.log("DB is open for use");
});

module.exports = db;
