// 📁︎ routers/eg.js
const express = require('express')
const router = express.Router()
const {log} = console

router.use((req, res, next) => {
	// log(`${req.method} @ ${req.path}`)
	log('request at `eg` router...')
	next()
})

router.get('/', (req, res, next) => {
	res.send('You 🏇︎')
})

router.get('/me', (req, res) => {
	res.send('Me 🤺︎')
})

module.exports = router
