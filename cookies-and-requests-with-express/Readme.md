# Readme

**For FRONTEND of test-lax cookies: https://github.com/sahilrajput03/test-lax-cookie/**

NOTE: Running your servers 8080(expressjs), 8081(,8082) webservers won't mimic the csrf attach as lax cookies are still send to the server(8082) IDK why..!!
But deploying the test html at netlify allows us to test lax cookies, i.e., visiting the netlify site doesn't send our lax cookie(saved in browser) to our server, yikes 🎁︎ 🎁︎!!

Do checkout the purgedCode.js file to see very useful code💓︎💓︎.

Note: `XSRF` or `CSRF` stands for "Cross Site Request Forgery" Attacks.

Learn about it @ below links:

1. https://developer.mozilla.org/en-US/docs/Glossary/CSRF
2. <https://en.wikipedia.org/wiki/Cross-site_request_forgery>
   Read the scripts in package.json file to know the initializing the http and express server details respectively.

## Some articles 🔥︎🔥︎ from MDN and express.js

- [SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

- Best internet article(for theory): <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie>

- To know about the `res.cookie` api refer the api docs @ <http://expressjs.com/en/5x/api.html#res.cookie>

- Learn abc of cookies @ <https://www.w3schools.com/js/js_cookies.asp>

- Other resoluces which are missing above can be found in the discord 🎁︎ server's group in `sahilrajput.ml`.

## FYI

```js
new Date().toUTCString() // This is how date should be encode to url safe format.
//Output: "Sat, 15 May 2021 14:02:17 GMT"
```

## Read article by express.js - Production Best Practises: Security

Link: <http://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely>

What is helmet and why use helmet, read it in above article as well.

If you are interested in performance tips from express, do read it at <https://expressjs.com/en/advanced/best-practice-performance.html>.
Link:

## Using fetch/axios to send cookie (as by default they don't send cookie)

<https://codewithhugo.com/pass-cookies-axios-fetch-requests/>
