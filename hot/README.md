# README

**Note:**
- (1) `hot-demo` uses `hot-module-replacement` npm package.
- (2) `hot-express-routes` uses `hot-module-replacement` npm package.
- (3) `me_FsOneFileHot/original` uses native `fs` package to watch for single file changes.
- (4) `me_nestedHotWithChokidar` uses `chokidar` package. (My custom hot-reloading utility)
  - **Inspiration: [Article](https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e)**
    - He also recommends to checkout: [Github Repo](https://github.com/glenjamin/ultimate-hot-reloading-example)
  - **What is `require.cache` ? Find in [nodejs docs](https://nodejs.org/api/modules.html#requirecache).**
  - Stackoverflow thread: [Click here](https://stackoverflow.com/questions/1972242/how-to-auto-reload-files-in-node-js)

**Benefits:**
- Database connection is cached thus on hot reload the older db connectoin can be reused instead of reconnecting again.
- Other info:
  - Used npm package - `hot-module-replacement`: [Github](https://github.com/sidorares/hot-module-replacement)
    - (my fork for backup): [Github Repo](https://github.com/sahilrajput03/hot-module-replacement )
  - *Another promising project(from the readme of `sidorares` repo): [Github Repo](https://github.com/darul75/express-hot-reload)*
  - *Another promising project: [Github Repo](https://github.com/shimondoodkin/node-hot-reload)*
