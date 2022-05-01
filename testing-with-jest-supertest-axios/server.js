const app = require('./app')

const PORT = 8080

app.listen(PORT, function () {
	console.log(`(🔥︎${process.env.NODE_ENV}) express running on', PORT, '...`)
})
