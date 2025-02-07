module.exports = {
  scripts: {
    default: "nps s.dev",
    start: {
      dev: "ts-node-dev --respawn --transpile-only --clear src/server.ts",
      debug: "ts-node-dev --inspect --respawn --transpile-only --clear src/server.ts",
      prod: "node dist/app.js"
    },
    build: "rm -rf dist && tsc",
    test: {
      default: "jest",
      watch: "jest --watchAll", // watch all
      debugWatch: "node --inspect node_modules/.bin/jest --watch",
    }
  }
};
