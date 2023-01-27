# Learn Express

For full *hot+flash+database_connected* please refer to `testing-hot-flash` directory in this repo.

**Please keep below text for future references of offline repos to be trackable back to this repo.**

- Added `async-config-in-servers` mini-setup done with Lalit @blulabs
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

## throttle requets for say DDos Attack or server crashin due to memory overflow maybe?

Get my guide and links by [clicking here](https://github.com/sahilrajput03/sahilrajput03/blob/master/learn-axios.md#make-server-to-limit-the-total-number-of-requets-to-be-handled-at-a-given-point-and-make-a-robust-client-side-mechanism-to-deal-with-such-error-in-a-sophisticated-manner).

## http status codes in code and sipmly refer to them when using these codes

```js
export declare enum HttpStatus {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLYHINTS = 103,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    AMBIGUOUS = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    MISDIRECTED = 421,
    UNPROCESSABLE_ENTITY = 422,
    FAILED_DEPENDENCY = 424,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505
}
```

## mongodb - connection states

![image](https://user-images.githubusercontent.com/31458531/192446672-e1d27156-5e62-49ec-a8b5-6732fe673067.png)

## Testing with axiosist seems really awesome

Source of Inspiration: https://github.com/axios/axios/blob/main/ECOSYSTEM.md

- Axiosist on npm: http://npm.im/axiosist
- Github/Docs: https://github.com/Gerhut/axiosist

```js
const axios = require('axios')
const axiosist = require('axiosist')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/host', (req, res) => res.send(req.get('host')))
app.get('/name', (req, res) => res.send({name: 'john'}))
app.post('/user', (req, res) => res.send({...req.body}))

const server = axiosist(app) // equivalent to below
// const server = axios.create({adapter: axiosist.createAdapter(app)})

void (async () => {
	const response = await server.get('/host')
	console.log('got resp.data', response.data)
})()

void (async () => {
	const response = await server.get('/name')
	console.log('name?', response.data)
})()

// Axiosist will keep the host header of the request, for example
void (async () => {
	const response = await server.get('https://loveapi.ml/host')
	if (response.data !== 'loveapi.ml') throw new Error('failed.')
})()

void (async () => {
	const usr = {name: 'Sahil', age: 10}
	const {data} = await server.post('/user', usr)

	if (data.name !== usr.name || data.age !== usr.age) throw new Error('user requets failed')
})()
```

## Expressjs starter in typescript

- Dev.to Article: [Click here](https://dev.to/codeoz/express-with-typescript-starter-explained-fast-4dn7)
- Github Repo linked in above article: [Click here](https://github.com/Code-Oz/basic-express-typescript)
- My latest `ts-node-dev` example: [Click here](https://github.com/sahilrajput03/learn-express/tree/main/with-typescript)
DIY:

Two step process:

1. First Step: Create a `src/app.ts` file:

```ts
import express from 'express'
import type { Application, Request, Response } from 'express'

const app: Application = express()

const port = 3001

app.get('/toto', (req: Request, res: Response) => {
  res.send('Hello toto')
})

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`)
})
```

2. Install dependencies:

```bash
npm init -y
npm i express
npm i -D typescript ts-node ts-node-dev @types/node @types/express

# Generate tsconfig file
npx tsc --init
# Now, in tsconfig.json file, you must change values like:
# "rootDir": "./src" /* Specify the root folder within your source files. */,
# "outDir": "./dist" /* Specify an output folder for all emitted files. */,

# Add below scripts to `package.json`:
#    "start": "npm run start:dev",
#    "start:dev": "ts-node-dev --respawn --transpile-only --clear src/app.ts",
#    "start:debug": "ts-node-dev --inspect --respawn --transpile-only --clear src/app.ts"


# Run the dev server
npm start
```

## What just happened to expressjs?

![image](https://user-images.githubusercontent.com/31458531/185786759-47b3711a-f113-42fa-b853-0c592141768a.png)


**Using `sahilrajput03-logger`:** 

*PLEASE READ ITS README*: https://github.com/sahilrajput03/logger-npm#readme

**Status Codes for http:** [Click here](status-code.md)

**PUT vs. PATCH in http requests**

*The main difference between the PUT and PATCH method is that the PUT method uses the request URI to supply a modified version of the requested resource which replaces the original version of the resource, whereas the PATCH method supplies a set of instructions to modify the resource.*

**What is the use of `express-async-errors` npm package**

- ALERT: You must have error printing `console.log(error)` in any of your middleware to print the db errors else you won't see db errors in your server terminal at all. For exact usage instruction refer projects [here](https://github.com/sahilrajput03/learning_sql/tree/main/fso-part13).

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

- Source: https://github.com/expressjs/morgan
- Source: https://www.npmjs.com/package/morgan

**Using morgan specifics:**

Learn: What is `content-length` anyway?
- [src1](https://stackoverflow.com/a/2773411/10012446): It's the number of bytes of data in the body of the request or response. The body is the part that comes after the blank line below the headers.
- [src2](https://stackoverflow.com/a/2773408/10012446): The Content-Length entity-header field indicates the size of the entity-body, in decimal number of OCTETs, sent to the recipient.


```bash
# custom
# morgan.token('body', (req, res) => JSON.stringify(req.body))
# app.use(morgan(':method :url :status :body - :response-time ms'))
PUT /api/users/jami_kousa 200 {"disabled":false} - 3.916 ms
POST /api/login 200 {"username":"jami_kousa","password":"secret"} - 1.201 ms

# custom (with response content-length)
# morgan.token('body', (req, res) => JSON.stringify(req.body))
# app.use(morgan(':method :url :status :body - :response-time ms - :res[content-length]'))
PUT /api/users/jami_kousa 200 {"disabled":false} - 4.020 ms - 83
POST /api/login 200 {"username":"jami_kousa","password":"secret"} - 1.145 ms - 203

# with app.use(morgan('tiny')) # :method :url :status :res[content-length] - :response-time ms
PUT /api/users/jami_kousa 200 83 - 6.340 ms
POST /api/login 200 203 - 1.934 ms

# with app.use(morgan('short')) # :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
::ffff:127.0.0.1 - PUT /api/users/jami_kousa HTTP/1.1 200 83 - 9.335 ms
::ffff:127.0.0.1 - POST /api/login HTTP/1.1 200 203 - 1.736 ms

# with app.use(morgan('combined')) # :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
::ffff:127.0.0.1 - - [26/Jul/2022:07:19:07 +0000] "PUT /api/users/jami_kousa HTTP/1.1" 200 83 "-" "-"
::ffff:127.0.0.1 - - [26/Jul/2022:07:19:07 +0000] "POST /api/login HTTP/1.1" 200 203 "-" "-"
```


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
