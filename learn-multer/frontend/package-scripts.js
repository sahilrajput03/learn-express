export default {
  scripts: {
    default: "nps dev",
    dev: {
      default: 'vite dev',
      testing: 'vite dev --mode=testing', // This command is not at all used by playwright. This command is to test "testing" related code for my own use only.
    },
    build: 'vite build',
    preview: 'vite preview',
    prepare: 'svelte-kit sync || echo \'\'',
    check: {
      default: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json',
      watch: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch'
    },
    format: 'prettier --write .',
    lint: 'prettier --check . && eslint .',

    // Below scripts are copied from learn-playwright repo at 11:16pm on 10 Feb 2025.
    test: {
      default: 'npx playwright test --project=chromium',
      headed: "npx playwright test --headed --project=chromium",

      // 🚀  LEARN: Open `Playwright Inspector` (helpful in debugging & step by step execution)
      // 🚀🚀  To run single test file use --- `nps "t.d ./tests/example2.spec.ts"`
      debug: 'npx playwright test --project=chromium --debug',


      // -------- Watch scripts --------
      // Playwright Native way (source: https://github.com/microsoft/playwright/issues/21960#issuecomment-1483604692)
      pn: 'PWTEST_WATCH=1 npx playwright test --project=chromium',

      // With UI mode
      ui: 'npx playwright test --project=chromium --ui',

      // 👌🏻 Nodemon (My custom way)
      n: {
        default: "nodemon -e spec.ts -x 'npx playwright test --project=chromium'",
        // 👌🏻 (Headed mode) Nodemon (My custom way)
        headed: "nodemon -e spec.ts -x 'npx playwright test --headed --project=chromium' -w tests"
      }
    }
  },
};
