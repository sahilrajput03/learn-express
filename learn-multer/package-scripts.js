module.exports = {
  scripts: {
    default: "nps s.dev",
    start: {
      dev: "ts-node-dev --respawn --transpile-only --clear src/app.ts",
      debug: "ts-node-dev --inspect --respawn --transpile-only --clear src/app.ts",
      prod: "node dist/app.js"
    },
    build: "rm -rf dist && tsc",
  }
};
