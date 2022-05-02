# Readme

To run tests with my custom library you can use `tw` i.e., npm script `"test:watch": "nodemon ./__tests__/index.js"`.

Inspiration: https://kentcdodds.com/blog/demystifying-testing

**TODO** I can extend `_setup_test_globals.js` into a binary using npm as well, and that'll allow anyone to do something like:

```bash
npm i -g tiny-testing-library

# USAGE:
# 1. Running single file
tl my_file.test.js

# 2. So tl will fetch all .test.js files recursively (except the `node_modules` folder) and run tests from them:
tl
```
