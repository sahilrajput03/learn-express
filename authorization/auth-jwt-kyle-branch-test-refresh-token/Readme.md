# Readme

Generating secrets:

```bash
node -e 'console.log(require("crypto").randomBytes(64).toString("hex"))'
````

What is this test-refresh-token branch does.

Before you implement any logic for your new server or frontend authentication, the foremost thing is that you must store both AT and RT in cookies and hence both are inaccessible by the frontend libraries^1.

Q2. Since none of AT and RT can't be stolen by any means, the point of using AT and RT now is that say anybody steals

Ans: ???? (needs research..)

^1: This means that any time you introduce any vulnerability to your frontend code via a vulnerable version of a library you are would be completely safe from xss attacks are no script is going to have your AT and RT. The key thing about using cookies is that you mus use cookies with `sameSite: 'lax'` and `httpOnly: true` properties. Yo!!

## Goal

NOTE : 🥰︎🥰︎🥰︎ The frontend application should store the refresh token in cookie so its impossible to fetch RT via the javascript but can be set by the server only to the target client, yikes!

[x]The point of this branch is to generate new refreshToken when we are generating `accessToken` using `/refresh-tokens` api path.

NOTE: Refresh token should never have any time expiry(even if required say it should be 1month at least.)

Simply use `nodemon filename.ts` file to run ts files, and make sure you have `ts-node` installed so `nodemon` can use it.

## What if I just use single <i>token</i> instead of using two token(<i>aT and rT</i>)

NB: at: accessToken, rT: refreshToken.

Q. What is 5m+7d thing?
A. I.e., the user <i>accessToken</i> is refreshed in 5min and <i>refreshToken</i> is valid for 7 days but it is actually explicitly expired when we query a new <i>accessToken</i> with latest <i>refreshToken</i> and thus we get a new <i>refreshToken</i>, so client needs to re-query every 5mins to get <i>accessToken</i>, by doing so we can check every 5 mins if somebody steal <i>refreshToken</i>, coz that can be stolen from client from the localStorage or sessionStorage via Xss(<i>almost impossible with react though</i>) or self Xss attack(say social hacker asks to execute some script in browser console). **SO**, using single <i>token</i> we can't test if user's <i>token</i> is used from the thief or the real user itself. We revoke the existing RT by simply maintaining the <i>activeRefreshToken</i> list in db/redis

The logic of having the validity of about 7 days of refresh token is to persist the user for 7 days from the last refresh token issued time. Although it can be very (**TODO**) easily implement to say to revoke all exiting refresh tokens by some logic additions in the authorization server.
