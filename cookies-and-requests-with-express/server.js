const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.disable('x-powered-by')

const {log} = console

const PORT = +process.argv[2] || 8080
//// app.use(cors()) // Default though.
// 🥰︎🥰︎ Check the readme.md file for the source of all below knowledge.

const isProd = true

app.use(
	cors({
		// origin: isProd ? false : true, 🧿︎🧿︎Mostly what you want..!!
		origin: false, // 🏌🏻🏌🏻 🧿︎BEST FOR PRODUCTION SERVER, i.e., ``origin: false`` so it'll prevent csrf attacks yikes!! FYI: Read the article @ ``readme-csrf.md`` file
		//// origin: 'http://localhost:81', // 🖐🏻 That means allow from specific origin.
		//// ^^^^ cors is very important and basically you must always ensure that cors in not enabled for any source, but cors is enabled on dev mode(we can make a check of that via process.env !== "produciton" and enable cors i.e., ``origin: true`` for developent server only. )
		// origin: true, // 🖐🏻(🧿︎BEST FOR DEVELOPMENT, but MOST vulnerable for production.) That means allow from every where🛑︎🛑︎ NEVER EVER DO THAT IN PRODUCTION.
		credentials: isProd ? false : true, // 🖐🏻 This is necessary to receive cookies from cross-origin requests.
	})
	// TEST1: Setting sameSite to strict doesn't prevent cookies being sent from other domain too.
)
app.use(express.json())

app.use(cookieParser())

app.get('/', (req, res) => {
	return res.send(
		`
		<button onclick="
							fetch('http://localhost:8080/checkCookie', {
						method: 'POST',
						credentials: 'include',
					})
						.then((result) => {
							return result.json()
						})
						.then((json) => {
							alert(JSON.stringify(json, null, 2))
						})
						.catch((e) => {
							alert('error::', e)
						})

		"> ==>  'Check cookie' request 🔥︎🔥︎ <==</button>
						<br/>
				<button onclick="
							fetch('http://localhost:8080/setCookie', {
						method: 'POST',
						credentials: 'include',
					})
						.then((result) => {
							return result.json()
						})
						.then((json) => {
							alert(JSON.stringify(json, null, 2))
						})
						.catch((e) => {
							alert('error::', e)
						})

		"> ==>  'Set cookie' request 🔥︎🔥︎ <==</button>

		`
	)
})

app.post('/setCookie', (req, res) => {
	// 🔽︎ Note this cookie can be seen only from the storage inspector(as we are using ```httpOnly: true```) in browsers ( say firefox 💓︎) in the browser.
	res.cookie('myHttpOnlyLaxCookie', 'https://looks_super_good/yahoo123', {
		httpOnly: true, // Setting it to true forbids JavaScript from accessing the cookie.
		secure: true, // The secure flag makes sure that cookies are only sent if the request it made to https site, hence ``secure: true`` helps prevent man in the middle attack(as attacker can't read https packets). Src: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#secure
		sameSite: 'lax', // Though 'lax' is default value if sameSite is option is not set as per LATEST STANDARDs, but the fallback to 'lax' is not adopted by firefox, safari, internet explorer, firefox for android, Safari on ios, samsung internet{on date:15 May, 21} (check current browser compartibility for ``default to lax`` @ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) and is needed to be send manually, yo! SO I AM manually setting sameSite to 'lax' on purpose.
		// 🛑︎ Since IE(all other browsers support it🥰︎) till(16March, 2021) now doesn't support sameSite=Lax option, cookies are unsafe in IE. Check the current status @ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite .
		// 💓︎💓︎💓︎💓 Setting 'lax' is just awesome 💓︎💓︎💓︎, as now with my culprit client site(having csrf attack, test @ https://test-lax-cookie.netlify.app/) no more sends the cookies to any GET OR POST REQUESTS(But be default the specification is only restrict sending cookies with POST request from cros-sites (any other domain sites) only but do send cookie with GET, HEAD requests).
		// sameSite: 'lax', // Though 'lax' is default value if sameSite is option is not set as per LATEST STANDARDs, but the fallback to 'lax' is not adopted by firefox, safari, internet explorer, firefox for android, Safari on ios, samsung internet{on date:15 May, 21} (check current browser compartibility for ``default to lax`` @ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) and is needed to be send manually, yo! SO I AM manually setting sameSite to 'lax' on purpose.
		// ? 🏅︎ If you don't want you cookies to shared across subdomain, then you must use 'strict' option for sameSite.
		domain: '', // Specifying domain so that my cookies are sent to all subdomains of my site, else (if ommited) cookies will be sent to only host domain(not to its subdomains).
		//If the value of 'domain' (say you set ```domain: example.com```) doesn't match the frontend's url then the cookie won't be saved to frontend and also you would be able to see 🛑︎ error {to disble the domain you can also put empty string instead of removing the above statement, yikes!}(this allows us that cookies are only sent to sites which we configure{also we can't configure more than one domain{subdomains are always allowed for the provided 💓︎ domain though}}) like that in browser console => 🛑︎  ```Cookie “myHttpOnlyCookie” has been rejected for invalid domain.```
		encode: String, // This is superb i.e., it encodes things like space, / and other characters in the value of the cookie, and then uses custome encoding i.e, you get value in browser what you sent not the default encoding which makes it harder to read cookie's value. (Read @ express docs @ http://expressjs.com/en/5x/api.html#res.cookie).
		// I read about all of above 💓︎ options @ mdn article and implemented using expressjs api docs. Check the 💓︎ readme.md file to get those articles.
	})
	return res.send({
		message:
			"Created a new cookies with name 'myHttpOnlyLaxCookie' in your browser ",
	})
})

app.post('/checkCookie', (req, res) => {
	// ? This route only works if you have used ``app.use(cookieParser())`` in your code.
	const hasNoCookies = Object.keys(req.cookies).length === 0

	console.log(
		'Cookies received from browser::',
		hasNoCookies ? 'THERE ARE NO COOKIES' : req.cookies
	)
	// console.log(typeof req.cookies) // object
	return res.send(req.cookies) // ? We are sending an object.
})

app.get('/checkCookie', (req, res) => {
	// ^^^^^💝︎💝︎ This route is to test as specification get requests do receive lax cookies but according to my testing, lax cookies are not send when any GET request to this is made from other domain, test it @ https://test-lax-cookie.netlify.app/ .
	// ? This route only works if you have used ``app.use(cookieParser())`` in your code.
	const hasNoCookies = Object.keys(req.cookies).length === 0

	console.log(
		'Cookies received from browser::',
		hasNoCookies ? 'THERE ARE NO COOKIES' : req.cookies
	)
	// console.log(typeof req.cookies) // object
	return res.send(req.cookies) // ? We are sending an object.
})

app.get('/clearCookie', (req, res) => {
	// Below code clears two 🍪︎ 🍪︎ cookies.
	res.clearCookie('firstCookie')
	res.clearCookie('secondCookie')
	return res.send('Cleared the cookie with name `firstCookie` in your browser')
})

app.get('/seeCookieRaw', (req, res) => {
	// ? This route works very good if you disable 🤠︎ `cookie-parser` though, but it would be very long string that you'd manually need to convert to object like shape and that is 😬︎😬︎tiring.
	// console.log(req.headers.cookie)
	// console.log(typeof req.headers.cookie) // string
	return res.send(req.headers.cookie)
})

app.listen(PORT, function () {
	console.log('express running on', PORT, '...')
})
