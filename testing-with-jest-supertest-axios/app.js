const express = require('express')
const app = express()
const cors = require('cors')
const egRouter = require('./routers/eg')
let {log} = console

app.disable('x-powered-by') // This is to disable x-powered-by header which is only useful if you are using 'helmet', and you must disable this header as the target hackers can launch application specific hacks on your server🤑︎.
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
	// log(`${req.method} @ ${req.path}`)
	next()
})

app.use('/eg', egRouter)

app.get('/', (req, res) => {
	return res.send("You made a get request on '/' endpoint.")
})

app.get('/a', (req, res) => {
	return res.status(201).send("You made get request on '/a' endpoint.")
})

app.get('/b', (req, res) => {
	// log(req.body)
	return res.status(203).send(req.body) // You don't need res.json to serialize js object to json, express does this on its own🤺︎.
})

module.exports = app // for testing with supertest as kalle said, supertest is actually nice!
