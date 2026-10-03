import { sign as makeToken, verify as decryptToken } from 'jsonwebtoken'
// `npm i jsonwebtoken`

const projectDetails = {
	projectName: 'name of your project',
	// You must use the different project_name to identify the project so that anytime later seeing any token you would know which token corresponds to which project.
	// Also, this is helpful if you are using same SECRET in another project, then you it would be easy to identify the the source of user.
	key1: 'value1',
	// You must change the key_name here if you change the SECRET for tokenization.
	// Using key_name is useful to identify if you have a bunch of keys in your vault and you get to know which key can be used to decrypt the token.
}

const main = async () => {
	const SECRET = 'some secret from .env file' // 10 is ok.
	const username = { username: 'sahilrajput03', ...projectDetails, }
	const jwtToken = await makeToken(username, SECRET)
	// console.log('Tokenized username?', jwtToken)
	// Output(changes on every execution): $2b$10$XLP4wLlXgILaXNOWJiJU6uusly/LQnl4DOe.cw3Eon003LQ0RWY/q

	console.log('\n✅Correct token test:')
	let decodedTokenData = await decryptToken(jwtToken, SECRET)
	console.log("decodedTokenData?", decodedTokenData)
	// Output:
	// {
	//   username: 'sahilrajput03',
	//   project_name: 'name of your project',
	//   key1: 'value1',
	//   iat: 1791039129 // * 'Note: the iat means time at which token was issued at.'
	// }
	const issuedAtDate = new Date(decodedTokenData.iat * 1000)
	console.log('issuedAtDate?', issuedAtDate)
	// Output: 2026-10-03T15:01:39.000Z
	console.log('\tIndian time: ', issuedAtDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))
	// Output: 3/10/2026, 8:32:22 pm

	console.log('\n\n🔴Bad token test:')
	try {
		decodedTokenData = await decryptToken('any bod text', SECRET)
	} catch (error) {
		console.log('❌ Decrypting token error:', { name: error.name, message: error.message })
		// { name: 'JsonWebTokenError', message: 'jwt malformed' }
	}
}

main()
