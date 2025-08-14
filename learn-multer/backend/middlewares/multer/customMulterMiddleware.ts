import multer from "multer"
import { upload } from "./multer"

const multerError = (fieldName: string, maxAllowed: number) => `Please make sure you are uploading to \`${fieldName}\` field and not more than ${maxAllowed} file${maxAllowed > 1 ? 's' : ''}.`

const handleMulterErrors = (req: any, res: any, next: any, fieldName: string, maxAllowed = 1) => (error) => {
    if (error instanceof multer.MulterError) {
        console.log('A Multer error occurred when uploading.') // [E.g., MulterError: Unexpected field]
        if (error.name === "MulterError" && error.message === 'Unexpected field') {
            // Note: Images do not actually upload if this error happens.
            res.status(400).json({ success: false, message: multerError(fieldName, maxAllowed), error });
        }
    } else if (error) {
        console.log('An unknown error occurred when uploading.')
    }
    next(error) // Everything went fine.
}
// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newProductUploadMiddleware = (req: any, res: any, next: any) => {
    const fieldName = "photos"
    const maxAllowed = 2
    upload.array(fieldName, maxAllowed)(req, res, handleMulterErrors(req, res, next, fieldName, maxAllowed))
}

// *! Note to Sahil: You never need to use `upload.single` for the use of single file upload but use `upload.array` with maxAllowed=1.
// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newUserUploadMiddleware = (req: any, res: any, next: any) => {
    const fieldName = "photo"
    upload.single(fieldName)(req, res, handleMulterErrors(req, res, next, fieldName))
}
