const express = require('express')

const router = express.Router()

console.log('file loaded..')
router.get('/hello', (req, res) => res.json({hello: 1000}))
router.get('/hi', (req, res) => {
	let dep2 = require('./dep1.js')
	console.log(dep2)
	return res.json({hi: 400, dep2})
})

module.exports = router
