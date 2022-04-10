const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/crash', (req, res) => {
	// Using throw new Error() is really good. The significant benefit from `throw "my message"` is that with `new Error()` we get the stacktrace which helps to track the error at the exact line number in the program.
	// 1. Send response (with status 500) to request at `/crash` and
	// 2. log to terminal at the same time!! Yo! This is so convenient and
	// 3. This will not crash the server at all coz express catches the exception internally.
	throw new Error('>>>Intentionally crash server to test livenessProbe, i.e., this container/pod will be restarted when noticed by livenessProbe anytime soon.')

	//  code here won't be executed ..
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

/*
 * SEE RESPONSE'S STATUS CODE:
 * curl -sI localhost:3000 | head -n1 | awk '{print $2}'
 *
 * curl_help: https://sahilrajput03.ml/learn-curl.html
 */
