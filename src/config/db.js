const mongoose = require("mongoose");
require("dotenv").config();

const uri =
  "mongodb://admin:qS8O3hOGVIPzhwlG@SG-tarry-squash-5982-67667.servers.mongodirector.com:27017/admin";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: false, // Disable SSL if not needed
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error for DB"));
db.once("open", function () {
  console.log("Connected to db");
});

module.exports = db;
