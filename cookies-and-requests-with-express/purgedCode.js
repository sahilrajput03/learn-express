// 🧸︎🧸︎
// var session = require('cookie-session') // express docs recommend to use cookie-session for idk what reason 🤔︎🤔︎.

//🧸︎🧸︎🧸︎ NOTE DON"T DELTE BELOW CODE...
// Below code sets two 🍪︎ 🍪︎ cookies.
res.cookie('zeroCookie', 'beautiful69')
//🔽︎ Note `firstCookie` 🦁︎ will be cleared after 10 ^^^^ seconds.
res.cookie('firstCookie', 'looks_good', {
	maxAge: 7_000, // QUOTING FROM MDN::> Number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately. If both Expires and Max-Age are set, Max-Age has 🔥︎precedence🔥︎.
	sameSite: 'lax', // Though 'lax' is default value if sameSite is option is not set as per LATEST STANDARDs, but the fallback to 'lax' is not adopted by firefox, safari, internet explorer, firefox for android, Safari on ios, samsung internet{on date:15 May, 21} (check current browser compartibility for ``default to lax`` @ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) and is needed to be send manually, yo! SO I AM manually setting sameSite to 'lax' on purpose.
}) // Works good.

//🔽︎ Note `firstCookie` 🦁︎ will be cleared after 10 ^^^^ seconds.
// res.cookie('firstCookieAAA', 'looks_good_AAA', {expire: 10 + Date.now()})
res.cookie('secondCookie', 'looks_too_good', {
	expires: new Date(Date.now() + 7_000), // This cookie will be cleared after 7 seconds later from current time. QUOTING FROM MDN::> When an Expires date is set, the deadline is relative to the client the cookie is being set on, not the server.
	sameSite: 'lax', // Though 'lax' is default value if sameSite is option is not set as per LATEST STANDARDs, but the fallback to 'lax' is not adopted by firefox, safari, internet explorer, firefox for android, Safari on ios, samsung internet{on date:15 May, 21} (check current browser compartibility for ``default to lax`` @ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) and is needed to be send manually, yo! SO I AM manually setting sameSite to 'lax' on purpose.
})
