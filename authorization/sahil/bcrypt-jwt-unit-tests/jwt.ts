import {sign as makeToken, verify as decryptToken} from 'jsonwebtoken'
// `npm i jsonwebtoken`

const tokenIdentifiers = {
	project_name: 'name of your project',
	// You must use the different project_name to identify the project so that anytime later seeing any token you would know which token corresponds to which project.
	// Also, this is helpful if you are using same SECRET in another project, then you it would be easy to identify the the source of user.
	key_name: 'mykey1',
	// You must change the key_name here if you change the SECRET for tokenization.
	// Using key_name is useful to identify if you have a bunch of keys in your vault and you get to know which key can be used to decrypt the token.
}

const main = async () => {
	const SECRET = 'some secret from .env file' // 10 is ok.
	const username = {
		username: 'sahilrajput03',
		...tokenIdentifiers,
	}
	const token = await makeToken(username, SECRET)
	console.log('tokenized username:')
	console.log(token) // Output(changes on every execution): $2b$10$XLP4wLlXgILaXNOWJiJU6uusly/LQnl4DOe.cw3Eon003LQ0RWY/q

	console.log('\nCorrect token test:')
	let fetched_username = await decryptToken(token, SECRET)
	console.log(fetched_username) // Output: true
	console.log('Note: the iat means time at which token was issued at.')

	console.log('\nBad token test:')
	try {
		fetched_username = await decryptToken('any bod text', SECRET)
	} catch (error) {
		console.log('ERROR: Decrypting token failed.')
	}
}

main()
