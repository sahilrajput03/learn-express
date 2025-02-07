# Learn Multer

## **TODO: Check what are the different needs of slasher's code and what is that code you wrote for the dependency inejction and is it better to use separate multer error handlers or make an abstraction of it based on the usage in the slasher's project.**

Upload files via postman:

## ❤️ Error handling in multer

- [Click here](https://www.npmjs.com/package/multer#error-handling)
  - [multer-error.js](https://github.com/expressjs/multer/blob/master/lib/multer-error.js)

## Todos

**Add code from sla\*\*\*r project for:**

1. Maximum file size upload limit and cancel the request. Sahil: I think this validation should also be specified in the frontend too.
2. Specify Allowed file type for e.g, jpg, jpeg, gif, etc to restrict uploading any other type of files where an image(s) is required.

### Multi Upload

<img src="./postman-multi-upload.jpeg" alt="drawing" width="700"/>

### Single Upload

<img src="./postman-single-upload.jpeg" alt="drawing" width="700"/>

## Multer Alternatives

**Buy why `multer` instead of alternatives?** Because it is official expressjs package - [https://github.com/expressjs/multer](https://github.com/expressjs/multer). From MULTER DOCS: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. **It is written on top of `busboy` for maximum efficiency.**

**Alternatives:**

- `formidable`:
  - [npm](https://www.npmjs.com/package/formidable)
  - [github](https://github.com/node-formidable/formidable)
- `busboy`:
  - [npm](https://www.npmjs.com/package/busboy)
  - [github](https://github.com/mscdex/busboy)

https://npmtrends.com/busboy-vs-formidable-vs-multer

<img src="./multer-alternatives.jpeg" alt="drawing" width="700"/>
