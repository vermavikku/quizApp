const auth = require("./auth.controllers");
const topics = require("./topics.controllers");
const questions = require("./questions.controllers");
const users = require("./users.controllers");

module.exports = {
    auth,
    topics,
    questions,
    users
}