import express from 'express'
import type { Application, Request, Response } from 'express'
import { newProduct, newUser } from '../controllers/product'
import { newProductUploadMiddleware, newUserUploadMiddleware } from '../middlewares/multer-utils'

const app: Application = express()

const port = 8080

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express + typescript')
})

app.put("/new-user", newUserUploadMiddleware, newUser)
app.put("/new-product", newProductUploadMiddleware, newProduct)

app.listen(port, function () {
  console.log(`App running on: http://localhost:${port}`)
})
