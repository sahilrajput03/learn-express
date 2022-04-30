require("dotenv").config(); // Importing .env's variables .

const {EXPRESS_PORT, EXPRESS_ENV} = process.env;

module.exports = `
<h2>Here are current endpoints in express:</h2>
<a href='http://localhost:${EXPRESS_PORT}/api/blogs'>/api/blogs</a>
<br/>
<br/>
~ (${EXPRESS_ENV} server)
`;
