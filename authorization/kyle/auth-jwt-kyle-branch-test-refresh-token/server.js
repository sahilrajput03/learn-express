require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
	{
		username: 'kyle',
		title: 'Post 1',
	},
	{
		username: 'jim',
		title: 'Post 2',
	},
]

app.get('/posts', authenticateToken, (req, res) => {
	const post = posts.filter((post) => post.username === req.user.username)
	console.log({post, username: req.user.username})
	res.json(post)
})

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err)
		if (err) return res.sendStatus(403)
		// console.log({user})
		req.user = user
		next()
	})
}

app.listen(3000)
