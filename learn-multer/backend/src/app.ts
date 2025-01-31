import express from 'express'
import type { Application, Request, Response } from 'express'

const app: Application = express()

const port = 8080

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express + typescript')
})

app.listen(port, function () {
  console.log(`App running on: http://localhost:${port}`)
})
