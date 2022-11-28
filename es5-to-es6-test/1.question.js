/* Refactor the following code to use modern javascript best practices
 such as async await, exceptions, arrow functions and block scoped variable definitions.
Hint: Promise.all is fine */

// import axios from 'axios';
const axios = require('axios')

function findAllCustomerData(baseURL) {
	return new Promise(function (resolve, reject) {
		axios
			.post('customers', {}, {baseURL: baseURL})
			.then(function (result) {
				var dataPromises = result.data.customerIds.map(function (customerId) {
					// RESPONSE = { first_name: 'Makenna', last_name: 'Bradtke', id: '1' }
					return axios.get('customers/' + customerId, {baseURL: baseURL})
				})

				Promise.all(dataPromises)
					.then(function (res) {
						resolve(
							res.map(function (result) {
								return result.data
							})
						)
					})
					.catch(function (err) {
						reject(err)
					})
			})
			.catch(function (err) {
				console.log('fails', err.toString())
				reject(err)
			})
	})
}

;(function () {
	// RESPONSE = { customerIds: [ '1',  '2', '3', '4',  '5', '6', '7',  '8', '9', '10' ] }
	var baseURL = 'https://ktwjky3ybe.execute-api.us-east-1.amazonaws.com'
	findAllCustomerData(baseURL)
		.then(function (customers) {
			customers.forEach(function (customer) {
				console.log(customer.id + ': ' + customer.first_name + ' ' + customer.last_name)
			})
		})
		.catch(function (err) {
			console.error(err)
		})
})()
