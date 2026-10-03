// // iat stands for "issued at".
// const iat = 1619343576

// // Gettin current time in iat format, note the iat format `value` keep increating with time, so you can just use > method to compare if a RT is issued after the last password's time, and if yes log out the user and ask to change the password.
// const currentTimeIat = () => Math.floor(new Date().getTime() / 1000)

// // Other knowingness.
// // const dateInstanceFromIat = new Date(iat * 1000)
// // const originalIat = dateInstanceFromIat.getTime() / 1000

// // Source of 👆︎👆︎ above knowledge: https://stackoverflow.com/a/33322779/10012446

// // **********************************
// console.log('****')
// let jwt_iat = 1619350051
// let node_iat = currentTimeIat()

// console.log(jwt_iat, 'jwt_iat')
// console.log(node_iat, 'node_iat')

// const date_jwt_iat = new Date(jwt_iat * 1000)
// const date_node_iat = new Date(node_iat * 1000)

// console.log(date_jwt_iat, 'date_jwt_iat')
// console.log(date_node_iat, 'date_node_iat')
