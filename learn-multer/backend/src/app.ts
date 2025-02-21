import express from 'express'
import type { Application, Request, Response } from 'express'
import { newProduct, newUser } from '../controllers/product'
import { newProductUploadMiddleware, newUserUploadMiddleware } from '../middlewares/multer/customMulterMiddleware'
import { commonMulterMiddleware } from '../middlewares/multer/commonMulterMiddleware'
import cors from 'cors'

export const app: Application = express()

app.use(cors()) // necessary otherwise we get cors error in frontend while uplaoding

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express + typescript')
})

// Note to Developer:
// 1. `POSTMAN`: Sometimes there is issues with postman when you copy/paste requests it doesn't able to keep correct cache of images --- thus makek sure you delete all images after you copy/page any request that has images attached to it. Thanks.
// 2. Please avoid using `upload.single('photo')` or `upload.array('photos', 2)` directly in the below routes as middlewares because multer throws very unreadable errors at commonly thus we try to catch multer specific error as specifed in official docs here - https://www.npmjs.com/package/multer#error-handling

// older
app.post("/v1/single-image", newUserUploadMiddleware, newUser)
app.post("/v1/multiple-image", newProductUploadMiddleware, newProduct)

// & NEW Awesome way
app.post("/v2/single-image", commonMulterMiddleware('photo', 1), newProduct) // We use `newProduct` here since we are using `upload.array` in `commonMulterMiddleware` thus we receive an array of 1 file in `req.files`.
app.post("/v2/multiple-image", commonMulterMiddleware('photos', 2), newProduct)
