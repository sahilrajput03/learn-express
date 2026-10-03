import bcrypt from 'bcrypt'
import assert from 'node:assert'

// & Run this file via: nr bcrypt

const main = async () => {
	const saltRounds = 10 // 10 is ok.
	const password = 'love is eternal'
	const hashedPassword = await bcrypt.hash(password, saltRounds)
	console.log('hashedPassword?', hashedPassword)
	// Output (changes on every execution): $2b$10$XLP4wLlXgILaXNOWJiJU6uusly/LQnl4DOe.cw3Eon003LQ0RWY/q

	console.log('\nCorrect password test:')
	const isAuthenticated1 = await bcrypt.compare(password, hashedPassword)
	assert(isAuthenticated1 === true)
	console.log('isAuthenticated1?', isAuthenticated1)
	// Output: true

	console.log('\nBad password test:')
	const isAuthenticated2 = await bcrypt.compare('other passwords', hashedPassword)
	assert(isAuthenticated2 === false)
	console.log('isAuthenticated2?', isAuthenticated2)
	// Output: false
}

main()
