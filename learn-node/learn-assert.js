var assert = require('assert');

// Syntax: ```function(actual, expected, errMessage)```
//  Learn: The third parameter is for custom error message to be thrown in case of test failure.
assert.equal(50, 50); //OK
assert.equal(50, '50'); //OK
assert.deepEqual({ a: 10 }, { a: '10' });

assert.throws(() => {
    assert.deepStrictEqual({ a: 10 }, { a: '10' }); /* Expected values to be strictly deep-equal: */
});

assert.throws(() => {
    assert.equal(50, 70); /*AssertionError: 50 == 70 */
});

assert.throws(() => {
    assert.equal(50, 70, '50 not equals 70'); /*AssertionError: 50 == 70 */
});

// An alias of strictEqual.
assert.equal(1, true);

// alias for assert()
// Tests if value is truthy. It is equivalent to assert.equal(!!value, true, message).
assert.ok(1);

assert.ok('1');

assert.throws(() => {
    assert.ok('');
});

assert.throws(() => {
    assert.ok(0);
});

assert.throws(() => {
    assert.ok(null);
});

assert.throws(() => {
    assert.ok(undefined);
});

assert(1); // same as assert.ok() , src: https://www.w3schools.com/nodejs/ref_assert.asp

/*
 * Src: https://www.w3schools.com/nodejs/ref_assert.asp
Nodejs. Builtin assert module
======  =====================
Assert Methods
====== =======
Method	Description		:
assert()				:	Checks if a value is true. Same as assert.ok()
deepEqual()				:	Checks if two values are equal
deepStrictEqual()		:	Checks if two values are equal, using the strict equal operator (===)
doesNotThrow()			:	
equal()					:	if two values are equal, using the equal operator (==)
fail()					:	an Assertion Error
ifError()				:	Throws a specified error if the specified error evaluates to true
notDeepEqual()			:	Checks if two values are not equal
notDeepStrictEqual()	:	Checks if two values are not equal, using the strict not equal operator (!==)
notEqual()				:	Checks if two values are not equal, using the not equal operator (!=)
notStrictEqual()		:	Checks if two values are not equal, using the strict not equal operator (!==)
ok()					:	 if a value is true
strictEqual()			:	Checks if two values are equal, using the strict equal operator (===)
throws()				:	
*/