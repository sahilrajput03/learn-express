// 🤺︎🤺︎ Authorization server.
require('dotenv').config()
const {v4} = require('uuid')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

// 🏇︎🏇︎, Note: at and rt means accessToken and refreshToken.
app.use(express.json())

const currentTimeIat = () => Math.floor(new Date().getTime() / 1000)

// 🏇︎ Here jti is `jwtTokenId`, i am adding it here for fun only.
let users = [
	{
		username: 'jim',
		passwordHash: '10',
		latestPasswordIssuedAt: currentTimeIat(),
		jti: v4(),
	},
]

// 🏇︎ renamed this, one should only use some db/redis storage for this.
let validRTs = []

// my test..
let isUserVulnerable = (iat) => {}

app.post('/fresh-tokens', (req, res) => {
	const authHeader = req.headers['authorization']
	const inputRT = authHeader && authHeader.split(' ')[1]
	// const inputRT = req.body.rt// original
	if (inputRT == null) return res.sendStatus(401)
	jwt.verify(inputRT, process.env.REFRESH_TOKEN_SECRET, (err, usernameForT) => {
		if (err) return res.sendStatus(403)
		// ~~sahil
		// user vulnerable check..
		const usrDb = users.find((user) => user.username === usernameForT.username)

		if (!validRTs.includes(inputRT)) {
			// console.log('usernameForT.iat', usernameForT.iat)
			// console.log('usrDb.latestPasswordIssuedAt', usrDb.latestPasswordIssuedAt)

			// ? READ IN THE README.MD FILE AS WE ARE STORING RT IN CACHE AND CACHE (HTTPONLY) IS NOT ACCESSIBLE BY THE 🤹︎🤹︎ FRONTEND JAVASCRIPT CODE, HENCE WE DON'T NEED TO WORRY IF RT IS STOLEN AT ALL(AS ITS NOT 📢︎ POSSIBLE), YIKES!
			// ! LEARN: Below check is only useful when the RT token is stolen(and that happens only if you store it in localStorage/sessionStorage), since we are not storing our RT in the client storage, no body can actually steal the RT, so below RT expired check is only useful in case you are storing the RT in localStorage in browser.
			//// const isRtIssuedAfterLatestPasswordChange =
			//// 	usernameForT.iat > usrDb.latestPasswordIssuedAt
			//// ? You should store the RT in db.(Don't think of storing the RT in memory as that will cause inability to login after the AT has expired, //TODO DO CHECK IF THE WE CAN SAVE RT IN MEMORY AND CAN FETCH IT SAFELY LATER ON.. anyhow..?? )
			//// ? Thanks to Akash@sourcefuse for reminding me that.
			//// if (isRtIssuedAfterLatestPasswordChange) {
			//// ? ^^ when this is true, that means refresh token was stolen after the last password changed, hence user is adviced to change password.
			//// TODO ... Do a logic here so that when some recent expired token is used, just revoke the ``current issued refresh token and the access token as well`` for that user, also show the same below messge with login page, yike!!!
			//// ? 🔽︎ Basically instead of showing the below message to user, send the user using res.redirect to login with below message on top, so user will supposedly change the password(if its not hacker).
			//// 	return res
			//// 		.status(404)
			//// 		.send(
			//// 			'🛑︎ALERT🛑︎::You tried a refresh token which is already used, and it was created recently and you have not changed password since then. \n\nYou are probaly hacked, we STRONGLY 🙏︎ advice you change your password and 🤺RE-LOGIN🤺 with new password. \n\nSECURIT NOTEICE: We have logged you out from everywhere so that no harm could be made to your account.'
			//// 		)
			//// }

			return res.status(403).send('🔫︎🔫︎ You tried expired refresh token...')
		}

		//
		validRTs = validRTs.filter((token) => token !== inputRT)
		const rt = generateRefreshToken({username: usernameForT.username}) // DON"T use generateRefreshToken(usernameForT) as it'll throw runtime error ```Error: Bad "options.expiresIn" option the payload already has an "exp" property.```
		// const rt = jwt.sign({...user, jti: v4()}, process.env.REFRESH_TOKEN_SECRET)// original.
		validRTs.push(rt)
		// ~~sahil
		const at = generateAccessToken({username: usernameForT.username}) // DON"T use generateAccessToken(usernameForT) as it'll throw runtime error ```Error: Bad "options.expiresIn" option the payload already has an "exp" property.```
		res.json({at, rt})
	})
})

app.delete('/logout', (req, res) => {
	const authHeader = req.headers['authorization']
	const rt = authHeader && authHeader.split(' ')[1]
	validRTs = validRTs.filter((token) => token !== rt)
	res.sendStatus(204)
})

app.post('/login', (req, res) => {
	// Authenticate User using bcryptjs.🏇︎
	const usrDb = users.find((user) => user.username === req.body.username)
	if (!usrDb) return res.send('username is incorrect...')

	const inputPassHash = req.body.password + '0' //  mimicing password hashing practise.
	if (usrDb.passwordHash !== inputPassHash)
		return res.send('password is incorrect...')

	// authorize user ***
	// 🏇︎ Note: We are passing user to both accessToken and refreshToken, so data inside those are same.
	const usernameForT = {username: usrDb.username}
	const at = generateAccessToken(usernameForT)
	const rt = generateRefreshToken(usernameForT)
	validRTs.push(rt)
	res.json({at, rt})
})

app.use('/new_password', (req, res) => {
	const {username, new_password} = req.body

	const usrdb = users.find((user) => user.username === username)
	usrdb.passwordHash = new_password + '0'
	usrdb.latestPasswordIssuedAt = currentTimeIat()
	res.send(`Password changed to: '${new_password}'`)
})

app.listen(4000)

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
}

function generateRefreshToken(usrForToken) {
	return jwt.sign(usrForToken, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d', // 7 days.
	})
}
