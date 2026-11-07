# Sauce Demo – Cucumber + Playwright + TypeScript

BDD framework for https://www.saucedemo.com/ covering login (valid/invalid) and the end-to-end purchase journey. Test data comes from the `Examples` tables in the feature files.

## 1. Prerequisites

1. Install Node.js 20 LTS or later from https://nodejs.org (includes npm).
2. Verify:
   ```
   node -v
   npm -v
   ```
3. (Optional) Install VS Code and the "Cucumber (Gherkin) Full Support" extension.

## 2. Setup

From the project root (`c:\Playwright\AnnaPlaywrightProj2`):

```
npm install
npm run install:browsers
npm run typecheck
```

## 3. Running tests

| Suite | Command | Tag |
|-------|---------|-----|
| Smoke | `npm run test:smoke` | `@smoke` |
| Sanity | `npm run test:sanity` | `@sanity` |
| Regression | `npm run test:regression` | `@regression` |
| Everything | `npm test` | - |
| Headed smoke | `npm run test:headed:smoke` | `@smoke` |
| Headed sanity | `npm run test:headed:sanity` | `@sanity` |
| Headed regression | `npm run test:headed:regression` (or `npm run test:headed`) | `@regression` |

Run an ad-hoc tag expression:
```
npx cucumber-js --tags "@smoke and not @sanity"
```

Run one feature file or scenario by line:
```
npx cucumber-js features/login.feature
npx cucumber-js features/login.feature:12
```

Environment variables (PowerShell):
```
$env:BROWSER="firefox"; npm run test:smoke      # chromium | firefox | webkit
$env:HEADLESS="false"; npm run test:smoke       # show browser
$env:BASE_URL="https://www.saucedemo.com/"
```
Firefox/WebKit need: `npx playwright install firefox webkit`.

## 4. Report

After a run, open the report:
```
npm run report
```
Files:
- `reports/evidence-report.html` - one screenshot under every step of every scenario (opened by `npm run report`).
- `reports/cucumber-report.html` and `reports/cucumber-report.json` - standard Cucumber reports.

The evidence report is generated automatically after each test command, even when tests fail.

## 5. Structure

```
features/            Gherkin feature files (login, purchase)
src/steps/           Step definitions
src/pages/           Page objects (Base, Login, Inventory, Cart, Checkout)
src/support/         World, hooks (browser lifecycle, screenshot on failure), config
cucumber.js          Profiles: smoke, sanity, regression; report formats
```

## 6. Tagging

- Every scenario is `@regression`.
- `@sanity` and `@smoke` are applied at scenario or `Examples` level, so a suite picks only the tagged example rows.
- To add data, add a row to an `Examples` table; to add to a suite, tag that `Examples` block.
