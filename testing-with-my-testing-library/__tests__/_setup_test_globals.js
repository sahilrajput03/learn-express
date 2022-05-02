const tests = []

const test = (name, cb) => {
	tests.push({name, cb})
}

const testRunner = async ({name, cb}) => {
	log('\n::TEST::', name)
	try {
		await cb()
		log('\tTEST PASSED  ✅')
	} catch (e) {
		console.log('\tTEST FAILED:❌')
	}
}
// FYI :: I WOULD NEED TO RUN RUNTEST MANUALLY IN THE END OF THIS FILE.
const runTests = async () => {
	// log(tests)
	for await (const test of tests) {
		await testRunner(test)
	}
}

// This doesn't work man idk why!
// global = {...global, tests, test, testRunner, runTests}
// global = {tests, test, testRunner, runTests}

// What is global in nodejs?
// Ans. https://stackoverflow.com/a/66293366/10012446
global.a = 20
global.m = 10 // This will be avaialble everywhere now!
global.log = console.log // This will be avaialble everywhere now!
global.test = test
global.tetts = tests
global.testRunner = tests
global.runTests = runTests
