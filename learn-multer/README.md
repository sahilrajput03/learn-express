# Learn Multer

**TODO_FOR_THIS_PROJECT:**

- Migrate from spawning typescript `build` based backend server to `ts-node-dev` server like you have in `qr-solution` frontend project ❤️
  - (+ socket based communication b/w parent/child processes because `spawn('ts-node-dev myscript')'` doesn't work with ipc)
- Implement and test parial upload of files as done in slas\*\*\* project - check file - `uploads.module.ts`.

**Quick Links:**

- This resources is used in projects:
  - `qr-solution` project
- **Multer Docs**
  - Accept a mix of files from different multiple fields of the form: [https://www.npmjs.com/package/multer#fieldsfields](https://www.npmjs.com/package/multer#fieldsfields)
  - Setting file size limits in multer: [https://www.npmjs.com/package/multer#limits](https://www.npmjs.com/package/multer#limits)
  - Control which file to not upload: [https://www.npmjs.com/package/multer#filefilter](https://www.npmjs.com/package/multer#filefilter)

## ❤️ Error handling in multer

- [Click here](https://www.npmjs.com/package/multer#error-handling)
  - [multer-error.js](https://github.com/expressjs/multer/blob/master/lib/multer-error.js)

## Todos

**Add code from sla\*\*\*r project for:**

- Maximum file size upload limit and cancel the request. Sahil: I think this validation should also be specified in the frontend too.
  - Write tests for this as well.
- Specify Allowed file type for e.g, jpg, jpeg, gif, etc to restrict uploading any other type of files where an image(s) is required.
  - Write tests for this as well.

## Upload files via postman

**Multi file Upload**

<img src="./postman-multi-upload.jpeg" alt="drawing" width="700"/>

**Single file Upload**

<img src="./postman-single-upload.jpeg" alt="drawing" width="700"/>

## Multer Alternatives

**Buy why `multer` instead of alternatives?** Because it is official expressjs package - [https://github.com/expressjs/multer](https://github.com/expressjs/multer). From MULTER DOCS: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. **It is written on top of `busboy` for maximum efficiency.**

**Alternatives:**

- `formidable`:
  - [npm](https://www.npmjs.com/package/formidable)
  - [github](https://github.com/node-formidable/formidable)
- `busboy` (Note: `multer` uses `busboy` underneath):
  - [npm](https://www.npmjs.com/package/busboy)
  - [github](https://github.com/mscdex/busboy)

https://npmtrends.com/busboy-vs-formidable-vs-multer

<img src="./multer-alternatives.jpeg" alt="drawing" width="700"/>

## Are streams better as compared to saving file and then uploading to third party servers un a backend server? (ChatGPT)

Yes, using streams is generally better than saving a file and then uploading it to third-party servers, especially in a backend server environment. Here’s why:

**Advantages of Using Streams**

1. Lower Memory Usage – Streams process data in chunks, avoiding the need to load the entire file into memory. This is crucial for handling large files.
2. Faster Processing – Since data is processed as it arrives, there's no need to wait for the entire file to be stored before uploading.
3. Reduced Disk I/O – Directly streaming data eliminates the need for temporary file storage, reducing read/write operations on the disk.
4. Better Scalability – Since less RAM and disk space are used, your backend can handle more concurrent uploads without resource bottlenecks.
5. Improved Security – Avoids storing sensitive files temporarily, reducing exposure to security risks.

**When Saving the File Might Be Better**

1. Post-Processing Needs – If you need to manipulate or analyze the file before uploading, storing it temporarily might be necessary.
2. Resumable Uploads – Some cloud services support resumable uploads, which might require temporary file storage.
3. Limited Third-Party API Support for Streams – Some APIs may not support streaming uploads, forcing you to save files first.

**Conclusion**

In most cases, streaming is the preferred method for efficiency, performance, and scalability. However, if your workflow requires file processing before uploading, a hybrid approach (streaming when possible, saving when necessary) might be the best solution.
