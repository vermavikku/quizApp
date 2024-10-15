const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./src/config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = require("./src/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Middleware

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  credentials: true,
};

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // enable CORS

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
