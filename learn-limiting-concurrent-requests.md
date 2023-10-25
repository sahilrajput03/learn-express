# Learn Limiting Concurrent Requests

**Quick Links:**
- async: [Github](https://github.com/caolan/async), [npm](https://www.npmjs.com/package/async).
  - queue: [Click here](https://caolan.github.io/async/v3/docs.html#queue)
 
```js
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const async = require('async');

const URLs = ['url-1', 'url-2', 'url-3', 'url-4', 'url-5'];
const CONCURRENCY = 2; // Adjust this number to control the concurrency level.

const API_LATENCY = 1_000; // Tip: Increase this value to test the concurrency.
const callFakeApi = (url) => new Promise((res, rej) => {
  console.log(`                            --> request @ ${url}`);
  setTimeout(() => {
    if (url.includes(4)) {
      rej('url-4 is not valid URL. Please check');
    } else {
      res(`<-- response of ${url}`);
    }
  }, API_LATENCY);
});

async function main() {
  const queue = async.queue(async (url) => {
    // Note: "async" library's async.queue function doesn't use a callback function
    // for task completion when using await. So we must use below way to handle errors.
    try {
      const res = await callFakeApi(url);
      console.log(res);
    } catch (error) {
      console.log('Failed to execute request: error=', error);
    }
  }, CONCURRENCY);

  // Push each URL into the queue
  URLs.forEach((url) => {
    queue.push(url);
  });
  // or await the end
  await queue.drain();
  console.log('All items processed now!');

  // OUTPUT OF THIS PROGRAM:
  /**
       -->> request @ url-1
       -->> request @ url-2
    <<-- response of url-1
       -->> request @ url-3
    <<-- response of url-2
       -->> request @ url-4
    <<-- response of url-3
       -->> request @ url-5
    Failed to execute request: error= url-4 is not valid URL. Please check
    <<-- response of url-5
    All items processed now!
   */
}
main();
```
