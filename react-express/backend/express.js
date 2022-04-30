var path = require("path");
var cors = require("cors");
const express = require("express");
const app = express();
const docs = require("./docs");

let log = console.log;
require("dotenv").config(); // Importing .env's variables .

let isProduction = process.env.EXPRESS_ENV === "production";

// Use cors only in development server.
if (!isProduction) app.use(cors());

app.use(express.json());

const PORT = process.env.EXPRESS_PORT || 8080;

app.get("/api/blogs", (req, res) => {
  res.send("My blog app here...");
  // res.status(201).send('If you want to send custom status code.');
});

const docsMiddleware = (_, res) => {
  res.send(docs);
};

app.use("/api/docs", docsMiddleware);

if (isProduction) {
  // NOTE: Below middlewares are purposely put in the end of all middlewares so that all the routes that are not handled by express are transferred to out static serving so our routing works as expected, yikes🧸︎!
  const reactBuild = path.join(__dirname, "../build");
  const staticMiddleware = express.static(reactBuild);
  app.use(staticMiddleware);
  app.use("*", staticMiddleware);
} else {
  app.use("/", docsMiddleware);
}

app.listen(PORT, function () {
  // Please use EXPRESS_PORT in package.json file or .env to change the port directly.
  if (isProduction) {
    log(`Running production server with express + static files from 'build' directory on port ${PORT}... `);
    // require("open")(`http://localhost:${process.env.EXPRESS_PORT}`);
  } else {
    log(`Running development server with express on port ${PORT}...`);
  }
}); //the server object listens on port `PORT`
