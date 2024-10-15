const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const router = require("./src/routes");
const db = require("./src/config/db"); // Ensure your DB config is being used

dotenv.config();

const app = express();

// CORS options
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  credentials: true,
};

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Serve static files for Swagger UI
app.use("/public", express.static("public"));

// Swagger UI options
const options = {
  customCssUrl: "/public/css/swagger-ui.css", // Use absolute path for serving CSS
  customSiteTitle: "The Words That I Know API - Swagger",
};

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));

// Route setup
app.use("/v1", router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
