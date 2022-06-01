let m = 10

{
	// TIP: Outside variables are visible to inner scopes.
	let t = 20
	console.log(m)
	console.log(t)
}

console.log(t)
// ^^ this throws error becoz `t` is not in scope of above statement.
