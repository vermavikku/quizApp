const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");
const path = require("path");

const config = require("./config.json");
const auth = require("./docs/auth.json");
const users = require("./docs/users.json");
const topics = require("./docs/topics.json");
const questions = require("./docs/questions.json");

// Merge paths from each JSON file
Object.assign(
  config.paths,
  auth.paths,
  topics.paths,
  questions.paths,
  users.paths
);

// Merge tags from each JSON file
config.tags = [
  ...(config.tags || []),
  ...(auth.tags || []),
  ...(topics.tags || []),
  ...(questions.tags || []),
  ...(users.tags || []),
];

const options = {
  definition: config,
  apis: [], // No need to specify route files since we are directly using JSON files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
