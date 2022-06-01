// hello world in exress

const express = require("express"); // Installed file as dependency via: https://stackoverflow.com/a/70451584/10012446 // My own answer, tldr; npm i my-pkg@file:./path-to-my-pkg.js
const logMw = require("log-mw");
const sample = require("sample");
const l = require("l");

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(logMw);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/users", (req, res) => {
  const debug = 1; // ? FYI: I can make this flag change dynamically in production. WOW! Seems like I would never need postman to test 100%(coz we can post files with curl as well) of the requests anytime in future.
  if (debug || req.body.debug) {
    req.body = sample.debug_user_data1;
    l("---USING DEBUG DATA---", req.body);
  }

  return res.send(req.body);
});

app.put("/api/users", (req, res) => {
  if (req.body.debug) {
    req.body = sample.debug_user_data2;
    l("---USING DEBUG DATA---", req.body);
  }
  return res.send(req.body);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
