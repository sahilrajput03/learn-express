import multer from "multer"
import { upload } from "./multer"

const multerError = (fieldName: string, maxAllowed: number) => `Please make sure you are uploading to \`${fieldName}\` field and not more than ${maxAllowed} file${maxAllowed > 1 ? 's' : ''}.`

const handleMulterErrors = (req: any, res: any, next: any, fieldName: string, maxAllowed: number) => (error: any) => {
    if (error instanceof multer.MulterError) {
        console.log('A Multer error occurred when uploading.') // [E.g., MulterError: Unexpected field]
        if (error.name === "MulterError" && error.message === 'Unexpected field') {
            // Note: Images do not actually upload if this error happens.
            res.status(400).json({ success: false, message: multerError(fieldName, maxAllowed) });
        }
    } else if (error) {
        console.log('An unknown error occurred when uploading.')
    }
    next(error) // Everything went fine.
}

// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const commonMulterMiddleware = (fieldName: string, maxAllowed = 1) => (req: any, res: any, next: any) => {
    upload.array(fieldName, maxAllowed)(req, res, handleMulterErrors(req, res, next, fieldName, maxAllowed))
}