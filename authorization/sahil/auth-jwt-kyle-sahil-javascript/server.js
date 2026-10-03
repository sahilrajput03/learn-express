const express = require("express");
const jwt = require("jsonwebtoken");
const posts = require("./data.js");
const dotenv = require("dotenv");
const {log} = console;

const {sign: makeToken, verify: getToken} = jwt;

dotenv.config(); // This is not redundant.
const {ACCESS_TOKEN_SECRET} = process.env;
const app = express();
app.use(express.json());

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.body.username));
});

app.post("/login", (req, res) => {
  // authenticate user using bcrypt, easy-pasy.
  const user = {name: req.body.username};

  const accessToken = makeToken(user, ACCESS_TOKEN_SECRET);
  res.json({accessToken});
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).send("You forgot to provide the token in authorization header.");
  }

  let decodedToken;

  try {
    decodedToken = getToken(token, ACCESS_TOKEN_SECRET);
    // Since, getToken(jwt.verify) throws error if token is invalid, we must use try/catch around it.
  } catch (error) {
    // log("can't decode token");
    return res.status(403).send("Invalid token");
  }

  log({decodedToken});

  req.user = decodedToken;

  next();
}

app.listen(3000);
