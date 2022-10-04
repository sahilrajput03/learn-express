import express from 'express'
import {sign as makeToken, verify as decryptToken} from 'jsonwebtoken'
import posts from './data'
import dotenv from 'dotenv'
const {log} = console

// const {sign: makeToken, verify: getToken} = jwt

dotenv.config() // This is not redundant.
const {ACCESS_TOKEN_SECRET} = process.env
const app = express()
app.use(express.json())

app.get('/posts', authenticateToken, (req, res) => {
	res.json(posts.filter((post) => post.username === req.body.username))
})

app.post('/login', (req, res) => {
	// authenticate user using bcrypt, easy-pasy.
	const user = {name: req.body.username}

	// const token = makeToken(user, ACCESS_TOKEN_SECRET) // original.
	// be default HS256 encryption is used to make a new token if you don't pass algorithm to `jwt.sign` method, which is really good though.
	const token = makeToken(user, ACCESS_TOKEN_SECRET, {
		algorithm: 'none',
	}) // original.
	res.json({token})
})

function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization
	let token
	if (authHeader) {
		token = authHeader.split(' ')[1]
	} else {
		return res
			.status(401)
			.send('You forgot to provide the token in authorization header.')
	}

	let decodedToken

	try {
		decodedToken = decryptToken(token, ACCESS_TOKEN_SECRET)
		// Since, getToken(jwt.verify) throws error if token is invalid, we must use try/catch around it.
	} catch (error) {
		log("can't decode token")
		log(error)
		return res.status(403).send('Invalid token')
	}

	log({decodedToken})

	req.user = decodedToken

	next()
}

app.listen(3000)
