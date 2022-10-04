import bcrypt from 'bcrypt'
// `npm i bcrypt`

const main = async () => {
	const saltRounds = 10 // 10 is ok.
	const password = 'love is eternal'
	const hashedPassword = await bcrypt.hash(password, saltRounds)
	console.log('Hashed password:')
	console.log(hashedPassword) // Output(changes on every execution): $2b$10$XLP4wLlXgILaXNOWJiJU6uusly/LQnl4DOe.cw3Eon003LQ0RWY/q

	console.log('\nCorrect password test:')
	let isAuthenticated = await bcrypt.compare(password, hashedPassword)
	console.log(isAuthenticated) // Output: true

	console.log('\nBad password test:')
	isAuthenticated = await bcrypt.compare('other passwords', hashedPassword)
	console.log(isAuthenticated)
}

main()
