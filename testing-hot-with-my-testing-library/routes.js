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

router.post('/c', async (req, res) => {
	try {
		// log(req.body)
		let bruno = new personModel(req.body) // LEARN: Placing this in beforeAll or top scope causes issues.
		let reply1 = await bruno.save()
		// console.log('hurray reply 1:', reply1)

		res.send(reply1) // You don't need res.json to serialize js object to json, express does this on its own🤺︎.
		return
	} catch (error) {
		return res.send('Oh no no no nooo..' + error.message)
	}
})

module.exports = router
