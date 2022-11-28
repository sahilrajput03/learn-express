// javascript best practices
//  such as async await, exceptions, arrow functions and block scoped variable definitions.
// Hint: Promise.all is fine \*/

// import axios from 'axios'
const axios = require('axios')

async function findAllCustomerData(baseURL) {
	try {
		const result = await axios.post('customers', {}, {baseURL: baseURL})

		let dataPromises = result.data.customerIds.map((customerId) =>
			// RESPONSE = { first_name: 'Makenna', last_name: 'Bradtke', id: '1' }
			axios.get('customers/' + customerId, {baseURL: baseURL})
		)

		let res = await Promise.all(dataPromises)
		return res.map((result) => result.data)
	} catch (err) {
		console.log('fails', err.toString())
		throw err
	}
}

;(async () => {
	// RESPONSE = { customerIds: [ '1',  '2', '3', '4',  '5', '6', '7',  '8', '9', '10' ] }
	let baseURL = 'https://ktwjky3ybe.execute-api.us-east-1.amazonaws.com'
	try {
		const allcustomers = await findAllCustomerData(baseURL)
		allcustomers.forEach((customer) => {
			console.log(customer.id + ': ' + customer.first_name + ' ' + customer.last_name)
		})
	} catch (error) {
		console.error(error)
	}
})()
