# Learn Express

For full *hot+flash+database_connected* please refer to `testing-hot-flash` directory in this repo.

**Please keep below text for future references of offline repos to be trackable back to this repo.**

- Added `test-quokkajs-with-express` repo.
- Added `express-api-testing-with-jest-supertest-axios` repo.
- Added `expressReqBodyWithTypeGuarding` repo.
- Added `express-testing-middlwares-with-nextCalls` repo.
- Added `cookies-and-requests-with-express`
- Added `react-express` repo.
- Added `jwt-secure-authorization` repo.
- Added `nodejs-development-in-docker-container` repo.
- Added `node-hot-api-testing` repo.
- Added `node-modules-concept` repo.
- Added `learning_javascript_nodejs` repo.
- Added `node-testing-dhanur-rakesh learn-nodejs-testing-with-jest` and renamed to `learn-testing-assertions-with-jest` repo.
- Added `custom-NODE_PATH` repo.
- Added `ecma-wonder-in-node` repo.
- Added `learn-assertions` repo.

**PUT vs. PATCH in http requests**

*The main difference between the PUT and PATCH method is that the PUT method uses the request URI to supply a modified version of the requested resource which replaces the original version of the resource, whereas the PATCH method supplies a set of instructions to modify the resource.*

**What is the use of `express-async-errors` npm package**

- FYI: express-async-errors also prevents server crasing if any route throws some error as well(***this is really very IMPORTANT in production server that one bad endpoint doesn't cause entire server to go down***). I.e., ![image](https://user-images.githubusercontent.com/31458531/172602435-12c370ed-c162-4541-931a-5e3451042032.png)

So above happend instead of: ![image](https://user-images.githubusercontent.com/31458531/172602696-6b34a096-1369-4e26-9067-fd8929f4b3f0.png)
 which is really very important in any production server.

Source: [express-async-errors@github](https://github.com/davidbanham/express-async-errors), [Fullstackopen.com](https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch).

![image](https://user-images.githubusercontent.com/31458531/169242782-fd1012ab-a53b-495f-856d-03b2489c55c8.png)
![image](https://user-images.githubusercontent.com/31458531/169242898-7cacd7d4-563a-4f71-9aca-e750e6df1d6a.png)
![image](https://user-images.githubusercontent.com/31458531/169243043-329fe030-3c9e-42ad-a7b3-1c9276ab7c44.png)


**Sample server code for code structure reference @ https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai**

- FYI: We can put break point on the end of the function to check the value of last variable in the fuction as well.

![](./debug1.jpeg)



**FYI: For loading env from a file using command line env-cmd is an amazing tool: https://www.npmjs.com/package/env-cmd**

## Using morgan coz morgan is supported by express only! Yo!

Source: https://github.com/expressjs/morgan

## Difference b/w res.send and res.json ?

Read [here](https://stackoverflow.com/a/19041848/10012446).

**Also read the original code of express's** `res.json` and `res.send` code [here](https://github.com/expressjs/express/blob/master/lib/response.js).

## Setting auto-attching ready debugger for nodejs/expressjs via nodemon

**_FYI: I created a entry for `launch config` in system wide `settings.json` file so I don't necessaryily need to add below `launch.json` file for each nodejs based project or any file coz I CAN DIRECTLY CALL DEBUGGER NOW!!!!. Yikes!_**

**1. Create a file `.vscode/launch.json` in root folder.**

```json
{
  // Q. What process to attach with this debugger ???
  // ANSWER. Select this setting in the debugger dropdown first then press f5 key (or use the green play button) (use shift+f5 to stop debugger anytime later) in vscode and in command pallete entries or processes you need to select the entry with text `nodemon --inspect app.js` or `nodemon --inspect-brk app.js`. ROCKON!
  "name": "Attach to nodemon process ~Sahil",
  "type": "pwa-node",
  "request": "attach",
  // ^^ note that this is a of type attach and we have specified to `restart` via the restart option below to reattch to that process and pick the new processid automatically, yikes!
  // Get debugger select-dropdown with f5 key (use shift+f5 to stop debugger) in vscode and select the entry with text nodemon --inspect app.js or nodemon --inspect-brk app.js in the list of processes in there. ROCKON!
  "processId": "${command:PickProcess}",
  "restart": true,
  "protocol": "inspector"
  // "envFile": "${workspaceFolder}/.env"
  // ^^^ This is not required at all when we are using dotenv to load .env file, 1 May, 2022.
  // Our .env file is loaded simply (no need of cross-env), also the terminal would pick the values of `.env` file once you attach the debugger. Yikes!
},

```

**2. Now use nodemon to start the server i.e., `nodemon --inspect app.js`**. (NOTE: `.env` file will be in effect once the vscode debugger is attached). FYI: You can use alias like `nma file.js` or `nmas file.js` for `nodemon --inspect` or `nodemon --inspect-brk` respectively.\*\*

> **You can break on the very first line of the program via flag `--inspect-brk` instead of `--inspect` in you node/nodemon command. [Src](https://stackoverflow.com/a/39493551/10012446), [Src2](https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs), [Src3](https://nodejs.org/en/docs/guides/debugging-getting-started/#command-line-options), [Src4 @ FSO](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#debugging-node-applications). The benefit of using --inspect-brk can ensure that our program must break at the desired breakpoint coz in some cases the oprations in the our app.js gets done even before getting the debugger attached so the breakpoint gets missed thus to ensure that our desired breakpoint must hit we use --inspect-brk thus the program won't even run at all from the very first line of code so our node app gets enough time to get the vscode debugger attached and then we start the program execution. Yikes!**

**3. Get `debugger select-dropdown` with `f5` key (use `shift+f5` to stop debugger) in vscode and select the entry with text `nodemon --inspect app.js` or `nodemon --inspect-brk app.js` in the list of processes in there. ROCKON!**

> IMPORTANT: FYI: Read about the paramters you can use in `configuration` for `launch` settings in vscode: [Click here](https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes).

**More**

- _TIP: Use f9 to add/remove the breakpoint._

- _Loading .env file in the debugging mode. [Src](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_load-environment-variables-from-external-file)_

- Remote debugging applications: [@nodejs docs](https://nodejs.org/en/docs/guides/debugging-getting-started/#enabling-remote-debugging-scenarios), [@vscode docs](https://code.visualstudio.com/docs/editor/debugging#_remote-debugging).

## Phenomenal hot-module-replacement with node

![](./img-phenomenal-hot-replacement-rocks.jpeg)
