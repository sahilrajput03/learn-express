# Readme

**Quick Links:**
- ❤️ Learn Jest/expect: [Click here](./learn-jest-expect.md){: search-title="Learn Jest/expect"}
- ❤️ Implemented in:
  - [`learn-multer`](https://github.com/sahilrajput03/learn-express/tree/main/learn-multer)
  - [`qr-solution project`](https://github.com/sahilrajput03/qr-solution-backend)

## Important

- Benefits of using supertest ? **Ans. You don't need to start the server and it runs the server on its own(solves the bigger problem i.e., you never accidentally make the requests on development or production server's databases but test database only, YO!). Inspiration from [amazing stackoverflow answer](https://stackoverflow.com/a/62992056/10012446).**

**Update: 28 Jan (🇮🇳😇🇮🇳😇🇮🇳😇🇮🇳😇)**

- FYI: I now prefer using axios over supertest because I like to have external control myself to start and stop the server manually on my own and use an external jset like library for assertions.

## Terminologies

<i>Test Suites</i> means total number of test files.

## Tips

- Press _Enter_ key to re-run the tests when using `jest` cli.
- Reasons to use `supertest` over `axios`? **Ans. Bcoz supertest(12k stars) officially suggested by jest's docs in his express way of [testing article here](https://jestjs.io/docs/testing-frameworks#expressjs).**
- `-i` (alias for `--runInBand`): Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging ~ [Jest Docs](https://jestjs.io/docs/cli#--runinband).
- Why are we using `jest --verbose` in package.json for our `watch` and `watchAll` ? \*\*Ans. Beause without `--verbose` flag the console.log's doesn't print output to console(this is not default behaviour bcoz: say in pipeline we don't want print any values to the pipeline logs mostly\*).
- What should I use `--watch` or `--watchAll` with jest cli: Always use --watchAll, as if you change a file say `test1.test.js` then tests in `test2.test.js` won't be run as you only edited test1 file. And thus testing is not wholly done when you change a test file. So you must use `--watchAll` all the time if the app is not too big to test on every change.

From `jest -h`:

```txt
--watch                       Watch files for changes and rerun tests related
                              to changed files. If you want to re-run all
                              tests when a file has changed, use the
                              `--watchAll` option.                   [boolean]
--watchAll                    Watch files for changes and rerun all tests. If
                              you want to re-run only the tests related to the
                              changed files, use the `--watch` option.
```

```bash
# Watch single test only
t -t 'fix-order-test'

# For a test inside a describe block needs to be
t -t '<describeString> <testString>'

# Jest help (actually jest -h)
t -h

# Other way is using `test.only` function (alias as `it.only`) way of running without chaning the current terminal command to run only that test temporarily.

# where t is an alias in my .bashrc
# Jest
alias t='npm run test --'
alias tw='npm run test:watch --'
alias twa='npm run test:watchAll --'
# For debugging
alias twd='npm run test:watch:debug --'
```

## Debugging experience with jest

Super amazing coz with my vscode nodemon `auto-attacher`, debugger attach itself on each restart of test at the time of we save any file. Yo!

For debugging,

```bash
# Run below command:
twd
# Now, start the debugger(only need to start the debugger for once, yo!)

# Fyi: it is an alias, i.e
alias twd='npm run test:watch:debug --'

# npm script in package.json file:
# "test:watch:debug": "cross-env NODE_ENV=test node --inspect node_modules/.bin/jest --verbose --watch"
# ^^ FYI: This you don't need nodemon in above script.
```

**FYI: Changing value in the time of execution works amazingly well with debugger as well.**

## Running production locally for urgently critical case?

Read the _scriptsComments_ key in `package.json` file.

# Supertest vs. axios (axios wins clearly by popularity)

![image](https://github.com/user-attachments/assets/a2d9b4bb-adca-4093-9ec5-efc2a7edd3ca)
