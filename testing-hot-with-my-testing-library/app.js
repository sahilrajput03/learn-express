const express = require('express')
const app = express()

let router = require('./routes')

const cors = require('cors')
const egRouter = require('./routers/eg')
let {log} = console

// we don't need to await it here..? IDK ??
// require('./initMongodb.js')

app.disable('x-powered-by') // This is to disable x-powered-by header which is only useful if you are using 'helmet', and you must disable this header as the target hackers can launch application specific hacks on your server🤑︎.
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
	// log(`${req.method} @ ${req.path}`)
	next()
})

// TODO: Deal with this router somehow as well..
// app.use('/eg', egRouter)

app.use('/', function (req, res, next) {
	router(req, res, next)
})

module.exports = app // for testing with supertest as kalle said, supertest is actually nice!
