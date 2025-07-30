'use strict';

// `cookies` https://expressjs.com/en/starter/examples.html
//      Github: https://github.com/expressjs/express/blob/master/examples/cookies/index.js

var express = require('express');
var app = module.exports = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // & req.cookies (object)

// custom log format
if (process.env.NODE_ENV !== 'test') app.use(logger(':method :url'));


// & Learn: 1. Parses request cookies, populating `req.cookies` and `req.signedCookies` when
//      the secret is passed, used for signing the cookies.
app.use(cookieParser('my secret here'));

// parses x-www-form-urlencoded
app.use(express.urlencoded());

app.get('/', function (req, res) {
    if (req.cookies.remember) {
        res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
    } else {
        res.send('<form method="post"><p>Check to <label>'
            + '<input type="checkbox" name="remember"/> remember me</label> '
            + '<input type="submit" value="Submit"/>.</p></form>');
    }
});

app.get('/forget', function (req, res) {
    res.clearCookie('remember');
    res.redirect('/');
});

// & Learn: 0. In browser `remember` cookies are set ✅ using this route.
app.post('/', function (req, res) {
    if (req.body?.remember) {
        res.cookie('remember', 1, { maxAge: 60_000 }); /* 1 minute */
    }
    res.redirect('/');
});

app.listen(3000, () => console.log('✅Express started on port 3000'));
