// Below works but only with keeping older app.use(static..thing) in the code.
// BUT MY REDIRECT CODE THING LOOKS CLEANER AND MORE OBVIOUS TO USE.
// src: https://stackoverflow.com/a/49961816/10012446
// app.get("*", (req, res) => {
// const fpath = path.resolve(__dirname, "../build", "index.html");
// log(fpath);
// res.sendFile(fpath);
// });

// * LEARN :  Yes you do need to call next in middlewares of `app.use` too.
// app.use((req, res, next) => {
//   console.log("got request..");
//   next();
// });
