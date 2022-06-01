// What is scope

let fun = () => {
	let m = 10
	console.log('my m value in function fun', m)
}

fun()

console.log('my m value outside funtion fun', m)
// ^^ this throws error becoz `m` is not in scope of above statement.
