'use strict';

// 'cookie-session' https://expressjs.com/en/starter/examples.html
//      Github: https://github.com/expressjs/express/blob/master/examples/cookie-sessions/index.js

// npm - https://www.npmjs.com/package/cookie-session
var cookieSession = require('cookie-session'); // & `req.session` (object)
var express = require('express');

var app = module.exports = express();

// add req.session cookie support
app.use(cookieSession({ secret: 'manny is cool' }));

// do something with the session
app.get('/', function (req, res) {
    // & Learn: 0. In browser `session` and `session.sig` cookies are set ✅ using this route.
    // & Learn: 1. Stopping the server and starting again doesn't reset the `count`
    //           for any client because the cookies are stored in browser.
    // & Learn: 2. On Changing the `secret` value the resets the
    //           `count` is actually reset `req.session` beacuse that
    //           invalidates any data stored on `req.session` key.
    req.session.count = (req.session.count || 0) + 1;
    res.send('viewed ' + req.session.count + ' times\n'); // Count is saved on browser side
});

app.listen(3000, () => {
    console.log('✅Express started on port 3000');
});

// ? From ChatGPT - https://chatgpt.com/c/688a12b3-77c8-8007-b267-c851ac7790d2
// * Q1. Can `session` realted properties can only be assigned to session key?
// Yes — persisted session data must live on `req.session`.
//      1. With cookie-session, anything you assign on `req.session.*` is
//          JSON‑serialized into the cookie and will be available on the next request.
//          Setting properties elsewhere (e.g., req.user) won’t persist.
//      2. You can add any JSON‑serializable keys: req.session.count,
//          req.session.user = { id: 123 }, etc.
//      3. Avoid overwriting reserved fields (e.g., req.session.cookie in some
//         session libs).
//      4. To remove data: delete req.session.count. To clear the whole session:
//         req.session = null (cookie‑session) or req.session.destroy()
//         (express‑session).
//      5. Remember cookie limits: keep it small and don’t store
//         secrets—cookie-session signs but doesn’t encrypt.

// * Q2. Is the cookie value saved on browser?
// Yes. With `cookie-session`, the entire session object is stored in a browser cookie.
//  Key points:
//      1. The cookie holds your req.session data (e.g., count), plus a separate
//          signature cookie (.sig) to prevent tampering. It’s signed, not
//          encrypted—users can read the contents, but edits break the signature.
//      2. Size limit ~4 KB; keep session data small and non‑sensitive.
//      3. Default lifetime is a session cookie (cleared when the browser
//         closes). Use maxAge to persist longer.
//      4. By default httpOnly: true, so JavaScript can’t read it
//         (document.cookie), but it’s still visible in browser dev tools.

// * Q3. If you want server‑side storage instead, use `express-session` with a
//          store (e.g., Redis), which only puts a session ID in the cookie.
//          Check the ChatGPT link on the top above. (Awesome Answer)
