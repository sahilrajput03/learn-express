import multer from "multer"
import { upload } from "./multer"

const aMulterErrorOccuredWhenUploading = 'A Multer error occurred when uploading.'
const anUnknownErrorOccuredWhenUploading = 'An unknown error occurred when uploading.'

const singleFileErrorMulter = (fieldName: string) => `Please make sure you are uploading to \`${fieldName}\` fieldName to upload a single file only.`
const multiFileErrorMulter = (fieldName: string, maxAllowed: number) => `Please make sure you are uploading to \`${fieldName}\` field and not more than ${maxAllowed} files.`


// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newUserUploadMiddleware = (req: any, res: any, next: any) => {
    const fieldName = "photo"
    upload.single(fieldName)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(aMulterErrorOccuredWhenUploading) // [E.g., MulterError: Unexpected field]
            if (err.name === "MulterError" && err.message === 'Unexpected field') {
                res.status(400).json({ success: false, message: singleFileErrorMulter(fieldName) });
            }
        } else if (err) {
            console.log(anUnknownErrorOccuredWhenUploading)
        }
        next(err) // Everything went fine.
    })
}

// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newProductUploadMiddleware = (req: any, res: any, next: any) => {
    const fieldName = "photos"
    const maxAllowed = 2
    upload.array(fieldName, maxAllowed)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(aMulterErrorOccuredWhenUploading) // [E.g., MulterError: Unexpected field]
            if (err.name === "MulterError" && err.message === 'Unexpected field') {
                res.status(400).json({ success: false, message: multiFileErrorMulter(fieldName, maxAllowed) });
            }
        } else if (err) {
            console.log(anUnknownErrorOccuredWhenUploading)
        }
        next(err) // Everything went fine.
    })
}