let l = console.log
// require.cache[moduleName]
let count = 0

let printCount = () => {
	l(count++)
}

setInterval(printCount, 1_000)

require('hot-module-replacement')({
	// options are optional
	ignore: /node_modules/, // regexp to decide if module should be ignored; also can be a function accepting string and returning true/false
})

let foo = require('./b.js')

if (module.hot) {
	module.hot.accept('./b.js', () => {
		console.log('callback executed..')
		// if foo.js or any files that foo.js depend on are modified this callback is invoked
		foo = require('./b.js') // by this time module cache entry for 'foo' already cleaned and module reloaded, requiring again is the easiest way of geting reference to new module. We need to assign it to local foo variable to make our local code in this file aware of it.
	})
}
