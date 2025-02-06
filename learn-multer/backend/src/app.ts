import express from 'express'
import type { Application, Request, Response } from 'express'
import { newProduct, newUser } from '../controllers/product'
import { upload } from '../middlewares/multer'

const app: Application = express()

const port = 8080

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express + typescript')
})

app.put("/new-user", upload.single("photo"), newUser)
app.put("/new-product", upload.array("photos", 2 /** max allowed */), newProduct)

app.listen(port, function () {
  console.log(`App running on: http://localhost:${port}`)
})
