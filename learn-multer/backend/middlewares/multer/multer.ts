import multer from "multer";
import { v4 as uuid } from "uuid";
import * as mime from 'mime-types';

// We need to configure `storage` so that files are stored along with their extensions.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, cb) => {
        const id = uuid();
        let extName = file.originalname.split(".").pop() as string;
        // In tests, when I upload a pdf file I'm facing the issue that any pdf
        //      file is uploaded with name e.g, `xxx....xxx.blob` (ending with
        //      .blob) in the `local-storage-for-tests` folder, and to fix this
        //      issue I'm using `mime` package to get proper file extension 
        //      ('pdf') from the mimetype ('application/pdf').
        if (extName === 'blob') {
            extName = mime.extension(file.mimetype) as string // 'application/pdf' -> 'pdf'
        }
        const fileName = `${id}.${extName}`
        cb(null, fileName);
    }
});

export const upload = multer({ storage });