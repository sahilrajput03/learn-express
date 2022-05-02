// https://www.geeksforgeeks.org/node-js-fs-watchfile-method/
// https://nodejs.org/docs/latest/api/fs.html
let app = require('./app.js')

const fs = require('fs')
const path = require('path')
// console.log(require.cache) // it is an object with keys as filePaths of the .js files. It is central location of a module in nodejs environment.

const fn = () => {
	console.log('file changed')

	// invalidate and reload app.js module..
	filePath = path.join(__dirname, 'app.js')
	delete require.cache[filePath]
	app = require('./app.js')
}

fs.watchFile('app.js', {interval: 100}, fn)

const server = () => {
	console.log(app)
}

setInterval(server, 2000)
