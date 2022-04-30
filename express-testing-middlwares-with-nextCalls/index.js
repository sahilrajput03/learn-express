const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
	console.log('middleware beforee...')
	return next()
})
app.get('/', (req, res, next) => {
	setTimeout(() => next(), 1000)
	console.log('middleware1')
  	console.log("middleware cuprit")
    res.send('Hello brother!!!')
    next()
}, (req, res) => {
	console.log('middleware2')
  // res.send('Hello brother!!!')
})

app.listen(port, () => {
  console.log(`Example myapp listening at http://localhost:${port}`)
})
