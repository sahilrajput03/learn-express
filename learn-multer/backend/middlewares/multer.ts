import multer from "multer";
import { v4 as uuid } from "uuid";

// We need to configure `storage` so that files are stored along with their extensions.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, cb) => {
        const id = uuid();
        const extName = file.originalname.split(".").pop();
        const fileName = `${id}.${extName}`
        cb(null, fileName);
    }
});

export const upload = multer({ storage });
