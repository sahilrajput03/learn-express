# README

Hot module replacement with express server.

**Benefits:**
- Database connection is cached thus on hot reload the older db connectoin can be reused instead of reconnecting again.

- Used npm package - `hot-module-replacement`: [Github](https://github.com/sidorares/hot-module-replacement)
  - (my fork) https://github.com/sahilrajput03/hot-module-replacement github account as well.
- *Another promising project(from the readme of `sidorares` repo): https://github.com/darul75/express-hot-reload*
- *Another promising project: https://github.com/shimondoodkin/node-hot-reload*

## Amazing article which I used to make my own hot-reloading utility

**What is `require.cache` ? Find in [nodejs docs](https://nodejs.org/api/modules.html#requirecache).**

code in `me_nestedHotWithChokidar`

**Inspiration (I copied 99% code): https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e**

He also recommends to checkout: https://github.com/glenjamin/ultimate-hot-reloading-example/

- Stackoverflow thread: https://stackoverflow.com/questions/1972242/how-to-auto-reload-files-in-node-js
