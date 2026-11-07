export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com/',
  browser: (process.env.BROWSER ?? 'chromium') as 'chromium' | 'firefox' | 'webkit',
  headless: process.env.HEADLESS !== 'false',
  stepTimeoutMs: 30000,
  actionTimeoutMs: 10000,
};
