const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	return res.send("You made a get request on '/' endpoint.")
})

router.get('/a', (req, res) => {
	return res.status(201).send("You made get request on '/a' endpoint.")
})

router.get('/b', (req, res) => {
	// log(req.body)
	return res.status(203).send(req.body) // You don't need res.json to serialize js object to json, express does this on its own🤺︎.
})

router.get('/bugged_api', async (req, res, next) => {
	try {
		// always wrap your controller code with try catch and pass error to next() so error can be handled by errorHandler middleware.
		// Testing random error handling by errorHandler middleware!
		throw new Error('Some stupid error..')
	} catch (error) {
		next(error)
	}
})

router.post('/c', async (req, res, next) => {
	try {
		// log(req.body)
		let bruno = new personModel(req.body) // LEARN: Placing this in beforeAll or top scope causes issues.
		let reply1 = await bruno.save()
		// console.log({reply1})

		res.send(reply1) // You don't need res.json to serialize js object to json, express does this on its own🤺︎.
		return
	} catch (error) {
		next(error) // letting errorHandler middleware to handle the respons for the error.
	}
})

module.exports = router
