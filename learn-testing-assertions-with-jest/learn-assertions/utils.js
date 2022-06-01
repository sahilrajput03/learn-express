function sum(a, b) {
	let isaNumber = typeof a === 'number'
	let isbNumber = typeof b === 'number'
	if (!isaNumber || !isbNumber) {
		let err = 'either a or b is not a number type..'
		throw err
	}

	return a + b
}

function multply(a, b) {
	let aIsNumber = typeof a === 'number'
	let bIsNumber = typeof b === 'number'
	if (!aIsNumber || !bIsNumber) {
		let err = 'input value can not be a string'
		return err
	}

	return a * b
}

module.exports.sum = sum
module.exports.multply = multply
