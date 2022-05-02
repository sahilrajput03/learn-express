// https://www.geeksforgeeks.org/node-js-fs-watchfile-method/
// https://nodejs.org/docs/latest/api/fs.html
let chokidar = require('chokidar')
let watcher = chokidar.watch('./src')

let app = require('./src/app.js')

watcher.on('ready', function () {
	watcher.on('all', function () {
		console.log('all changed..')
		Object.keys(require.cache).forEach((id) => {
			if (/[\/\\]src[\/\\]/.test(id)) {
				delete require.cache[id]
				console.log('deleted:', id)
			}
		})

		// Loading `src/app.js` will reaload all the modules which we delete above..
		app = require('./src/app.js')
	})
})

const server = () => {
	console.log(app)
}

setInterval(server, 2000)

// LEARN: FYI: console.log('sahil\\') // Output: sahil\

// LEARN: regex used:
// if (/[\/\\]src[\/\\]/.test(id)) {
// ^^^^^^^ here [] means any of inside characters i.e., / or \
// so it matches paths like /src/ or \src\
// src: https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
