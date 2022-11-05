const express = require("express");
const asyncConfig = require("./config.js");

(async function () {
  const config = await asyncConfig();
  console.log("yo i got the config", config);

  // ? express server below...
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  // ? express server above...

  console.log(config);
  console.log(config);
  console.log(config);
  console.log(config);
  console.log(config);
  //   server program logic here...
})();
