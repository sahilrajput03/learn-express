import fs from 'fs'
import { upload } from '../middlewares/multer';
import multer from 'multer';

// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newUserUploadMiddleware = async (req: any, res: any, next: any) => {
  const fieldName = "photo"
  upload.single(fieldName)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('A Multer error occurred when uploading.') // [E.g., MulterError: Unexpected field]
      if (err.name === "MulterError" && err.message === 'Unexpected field') {
        // handle here...
        res.status(400).json({ success: false, message: `Please make sure you are uploading to \`${fieldName}\` fieldName to upload a single file only.` });
      }
    } else if (err) {
      console.log('An unknown error occurred when uploading.')
    }
    next(err) // Everything went fine.
  })
}
export const newUser = async (req: any, res: any, next: any) => {
  const photo = req.file as Express.Multer.File | undefined;
  console.log("🚀 photo:", photo)
  /**
  {
    fieldname: 'photo',
    originalname: 'peacock.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads',
    filename: '88246d52-cf8d-40e4-8cf5-51b11e08b8fc.jpg',
    path: 'uploads/88246d52-cf8d-40e4-8cf5-51b11e08b8fc.jpg',
    size: 641739
  }
  */

  if (!photo) {
    res.status(400).json({ success: false, message: 'Please send image' });
    return
  }

  // & One by one upload each file via `photos[i].path` and then delete it
  fs.unlinkSync(photo.path)

  res.status(201).json({ success: true, });
  return
};

// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newProductUploadMiddleware = async (req: any, res: any, next: any) => {
  const fieldName = "photos"
  const maxAllowed = 2
  upload.array(fieldName, maxAllowed)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('A Multer error occurred when uploading.') // [E.g., MulterError: Unexpected field]
      if (err.name === "MulterError" && err.message === 'Unexpected field') {
        // handle here...
        res.status(400).json({ success: false, message: `Please make sure you are uploading to \`${fieldName}\` field and not more than ${maxAllowed} files.` });
      }
    } else if (err) {
      console.log('An unknown error occurred when uploading.')
    }
    next(err) // Everything went fine.
  })
}
export const newProduct = async (req: any, res: any, next: any) => {
  const photos = req.files as Express.Multer.File[] | undefined;
  console.log("🚀 photos:", photos)
  /**
  [{
    fieldname: 'photos',
    originalname: 'lily.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads/',
    filename: '8fdd3dd0-aafd-4b00-8485-863c5728a11d.jpeg',
    path: 'uploads/8fdd3dd0-aafd-4b00-8485-863c5728a11d.jpeg',
    size: 550823
  }]
  */

  if (!photos) {
    res.status(400).json({ success: false, message: 'Please send images.' });
    return
  }

  // & One by one upload each file via `photos[i].path` and then delete it
  for (let i = 0; i < photos.length; i++) {
    fs.unlinkSync(photos[i].path)
  }

  res.status(201).json({ success: true, });
  return
};
