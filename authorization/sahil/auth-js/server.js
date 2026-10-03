// @ts-nocheck
const express = require("express");
const { sign: makeToken, verify: decryptToken } = require("jsonwebtoken");
const posts = require("./data.js");
const dotenv = require("dotenv");


dotenv.config(); // This is not redundant.
const { ACCESS_TOKEN_SECRET } = process.env;

const app = express();
app.use(express.json());

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.body.username));
});

app.post("/login", (req, res) => {
  const tokenData = { name: req.body.username };
  const token = makeToken(tokenData, ACCESS_TOKEN_SECRET);
  res.json({ token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  let token;
  if (!authHeader) { return res.status(401).send("You forgot to provide the token in authorization header."); }
  token = authHeader.split(" ")[1];

  let decryptedTokenData;

  try {
    // Note: decryptToken (jwt.verify) throws error if token is invalid.
    decryptedTokenData = decryptToken(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log("❌ Error: Can't decode token.", { name: error.name, message: error.message });
    return res.status(403).send("Invalid token");
  }

  console.log({ decryptedTokenData });

  req.user = decryptedTokenData;

  next();
}

app.listen(3000, () => {
  console.log('Server is running on port 3000 🎉');
});
