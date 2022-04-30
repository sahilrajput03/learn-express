# Readme

## Important

***Although its tempting to use `supertest` for making requests but its absolutely phenomental to make *pure functions* to make use of while making request functions with `axios` coz that empowers us code-reusability feature and that is super super cool.***

<i>withAxios.test.js</i> suite will fail if you don't have server running up (at right port).

- Benefits of using supertest ? Ans. You don't need to start the server,
  instead supertest

## Tips

- What should I use `--watch` or `--watchAll` with jest cli: Always use --watchAll, as if you change a file say <i>test1.test.js</i> then tests in <i>test2.test.js</i> won't be run as you only edited test1 file. And thus testing is not wholly done when you change a test file. So you must use `--watchAll` all the time if the app is not too big to test on every change.

- Run and watch a single test only:

  - `jest -t 'fix-order-test'`
  - or use test.only (or it.only) way of running without chaning the
    terminal command to run only that test temporarily. If you have your
    test inside a describe block you would need to do like: `jest -t '<describeString> <itString>'`.

  - Press _Enter_ key to re-run the tests when using `jest` cli.

- Reason to use axios over supertest, axios is mature (91k starts)
  whereas supertest is still new in market(9.1K) and its for testing only.

## Terminologies

<i>Test Suites</i> means total test files.
