import { defineConfig, devices } from '@playwright/test';
import { frontendTestServerPort } from './src/utils/constants';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',

  /* Run tests in files in parallel */
  // fullyParallel: true, //! Note to Sahil: I must disale this so that only 1 worker works otherwise my spm is spawned twice when playwright test command is run which is unintended as per my setup to spawn backend test server.
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,

  // Note to Sahil: I'm disabling the report generation after tests are run.
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Note to Sahil: I commendted below projects because I don't need firefox and safari browser tests for now.
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Note to Sahil: I enabled below commented code as it helps to reuse the
  // existing dev server if running otherwise start the dev server [tested].
  /* Run your local dev server before starting the tests */
  webServer: {
    command: `npx vite dev --port ${frontendTestServerPort} --mode=testing`,
    url: `http://localhost:${frontendTestServerPort}`,
    reuseExistingServer: !process.env.CI,
  },
});
