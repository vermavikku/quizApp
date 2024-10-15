const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // Ensure this is correctly set up

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

// Serve Swagger UI files
app.use("/api-docs", express.static("public/api-docs"));

// Setup Swagger UI to use the local files
app.get("/api-docs", (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="swagger-ui-bundle.js"></script>
        <script>
          const ui = SwaggerUIBundle({
            url: '/swagger.json', // Adjust the path to your swagger.json
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout",
          });
        </script>
      </body>
    </html>
  `);
});

// Route setup
app.use("/v1", router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
