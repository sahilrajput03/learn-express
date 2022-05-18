require('hot-module-replacement')({
	ignore: /node_modules/,
})

// Setup your test globals
require('flash-runner/_setup_test_globals.js')

// Define your test files here...(or you can fetch all .test.js files manually in this directory as well with nodejs api.
require('./withSupertest.test.js')

runTests()

if (module.hot) {
	module.hot.accept('./routes', () => {
		require('./withSupertest.test.js')
		runTests()
	})
}
