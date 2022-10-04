import axios from 'axios'
// learn: stackoverflow answer: https://stackoverflow.com/a/45581882/10012446
// learn: stackoverflow answer: https://stackoverflow.com/a/48754473/10012446

const fresh_token_url = 'http://localhost:4000/fresh-tokens'
const rt =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbSIsImlhdCI6MTYxOTQyOTg1OSwiZXhwIjoxNjIwMDM0NjU5fQ.SM-acbafozu_mC-CYTeiadVYQy3JmyrFB_VySsqaLdM'

let config = {
	headers: {
		Authorization: `Bearer ${rt}`,
	},
}

const body = {}

async function fun() {
	try {
		const response = await axios.post(fresh_token_url, body, config)
		const {data, status} = response
		console.log('request successful...')
		console.log('data', data)
		console.log('status', status)
	} catch ({response}) {
		console.log('request failed...')
		console.log('status', response.status)
		console.log('data returned', response.data)
	}
}

fun()

// axios is love though.
// axios.({method: get}) <== this is a little awkward method, so simply use axios.post method, yikes!!
