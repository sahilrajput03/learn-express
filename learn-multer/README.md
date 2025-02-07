# Learn Multer

## **TODO: Check what are the different needs of slasher's code and what is that code you wrote for the dependency inejction and is it better to use separate multer error handlers or make an abstraction of it based on the usage in the slasher's project.**

Upload files via postman:

### Multi Upload

![](./postman-multi-upload.jpeg)

### Single Upload

![](./postman-single-upload.jpeg)

## Error handling in multer

- [Click here](https://www.npmjs.com/package/multer#error-handling)
  - [multer-error.js](https://github.com/expressjs/multer/blob/master/lib/multer-error.js)

## Multer Alternatives

**Buy why `multer` instead of alternatives?** Because it is official expressjs package - [https://github.com/expressjs/multer](https://github.com/expressjs/multer)

**Alternatives:**

- `formidable`:
  - [npm](https://www.npmjs.com/package/formidable)
  - [github](https://github.com/node-formidable/formidable)
- `busboy`:
  - [npm](https://www.npmjs.com/package/busboy)
  - [github](https://github.com/mscdex/busboy)

https://npmtrends.com/busboy-vs-formidable-vs-multer

![](./multer-alternatives.jpeg)
