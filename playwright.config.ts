import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  reporter: [['html', { open: 'never' }], ['list']],
  outputDir: 'test-results',
  fullyParallel: true,
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'api', testMatch: '**/*.api.spec.ts' },
    {
      name: 'chromium',
      testMatch: '**/*.ui.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: '**/*.ui.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: '**/*.ui.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
