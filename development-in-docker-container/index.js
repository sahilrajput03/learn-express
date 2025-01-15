var http = require('http');

//create a server object:
http
	.createServer(function (req, res) {
		res.write('Hello World!'); //write a response to the client
		console.log('request recevied!');
		res.end(); //end the response
	})
	.listen(8086); //the server object listens on port 8080

console.log('Server started at http://localhost:8086');