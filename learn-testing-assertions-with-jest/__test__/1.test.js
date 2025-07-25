let log = console.log
log('hello..., still there?')
const {sum, multply} = require('../utils')

test('sum function', function () {
	let received = sum(1, 2)
	let expected = 3

	expect(received).toBe(expected)
})

test('multply', function () {
	let received = multply(2, 3)
	let expected = 6

	expect(received).toBe(6)
})

test('multply for bad input type', function () {
	let received = multply(3, 'a')
	let expected = 'input value can not be a string'

	expect(received).toBe(expected)
})

test('user object has all the properties', function () {
	let received = {name: 'dan', age: '22'}

	expect(received).toHaveProperty('name')
	expect(received).toHaveProperty('age')
})

test('user object contains a key-value pairs', function () {
	let received = {name: 'roy', age: 10, gender: 'male'}
	let expected = {name: 'roy', gender: 'male'}

	expect(received).toMatchObject(expected)
})

test('array contains a set of values', function () {
	let received = [1, 21, 31]

	expect(received).toContain(1)
	expect(received).toContain(21)
})

test('throw error', function () {
	let err = 'either a or b is not a number type..'

	expect(() => {
		sum('10', 21)
	}).toThrowError(err)
})

// All below expectation will be PASSED
//// expect(10).toBe(10)
//// expect({name: 'dan', age: '22'}).toHaveProperty('name')
//// expect({name: 'roy', age: 10}).toMatchObject({name: 'roy'})
///// expect([1,21,31]).toContain(1, 21)
