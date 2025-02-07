import express from 'express'
import type { Application, Request, Response } from 'express'
import { newProduct, newUser } from '../controllers/product'
import { newProductUploadMiddleware, newUserUploadMiddleware } from '../middlewares/multer/customMulterMiddleware'
import { commonMulterMiddleware } from '../middlewares/multer/commonMulterMiddleware'

const app: Application = express()

const port = 8080

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express + typescript')
})

// Note to Developer:
// 1. `POSTMAN`: Sometimes there is issues with postman when you copy/paste requests it doesn't able to keep correct cache of images --- thus makek sure you delete all images after you copy/page any request that has images attached to it. Thanks.
// 2. Please avoid using `upload.single('photo')` or `upload.array('photos', 2)` directly in the below routes as middlewares because multer throws very unreadable errors at commonly thus we try to catch multer specific error as specifed in official docs here - https://www.npmjs.com/package/multer#error-handling

// older
app.put("/single-image-1", newUserUploadMiddleware, newUser)
app.put("/multiple-image-1", newProductUploadMiddleware, newProduct)

// & NEW
app.put("/single-image-2", commonMulterMiddleware('photo', 1), newProduct) // we use `newProduct` because files are received in `req.files` for `upload.array` in multer
app.put("/multiple-image-2", commonMulterMiddleware('photos', 2), newProduct)

app.listen(port, function () {
  console.log(`App running on: http://localhost:${port}`)
})
