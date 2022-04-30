import {Request, Response} from 'express'

import express from 'express';

const app = express()
const port = 3000

interface Body_1 {
  car: string
  bike: string
}

app.get('/', (req : Request, res: Response) => {

  //// This => is utterly bad in typescript. => //let obj = req.body as BodyInterface
  if (isBody_1(req.body)) {
    // req.body. // This autocomplete gives us the RIGHT TYPES.
    
    
    
    
    
    
    res.send('Hello World!')
  } else {
    res.send("Bad body type of the request!!")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


const isBody_1 = (param: any): param is Body_1 => {
  return (param && "car" in param && "bike" in param)
}