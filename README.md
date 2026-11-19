# Overview

This project demonstrates a lightweight test automation framework built using Playwright and TypeScript.

- **API:** Swagger Petstore v3 — create a Pet using `POST /api/v3/pet`, with positive and negative cases.
- **UI:** OrangeHRM — successful login and invalid-password handling.
- **Browsers:** Chromium, Firefox and WebKit for UI tests.
- **Reporting:** Native Playwright HTML report, screenshots on failure and traces on failure.

The solution was intentionally designed to remain simple, maintainable and easy to execute. Additional scenarios and prioritisation are in [`docs/TEST_DESIGN.md`](docs/TEST_DESIGN.md).

# Requirements and Tech Stack

- Node.js 20 or newer (Node.js 22 LTS recommended)
- npm
- Playwright
- TypeScript
- Node.js
- dotenv

# Quick start

```bash
npm install
npx playwright install
npm run typecheck
```

Run API tests:

```bash
npm run test:api
```

Run UI tests in Chromium first:

```bash
npm run test:chromium
```

Run UI tests across all configured browsers:

```bash
npm run test:ui
```

Run the complete suite:

```bash
npm test
```

`.env.example` is provided as a reference. This project does not add a dotenv dependency, so export variables in your shell before running tests.

Do not commit real credentials or `.env` files.

## Reporting and debugging

- `playwright-report/` — interactive native HTML report.
- `test-results/` — test output, screenshots and traces retained on failure.

Open the HTML report with `npm run report`. Open an individual trace with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## Project structure

```text
TECHNICAL-ASSESSMENT-MOJ/
├── docs/
│   └── TEST_DESIGN.md
├── pages/
│   └── LoginPage.ts
├── test-data
│   ├── petData.ts
│   └── userData.ts
├── tests/
│   ├── api/
│   │   └── petstore.api.spec.ts
│   └── ui/
│       └── orangehrm-login.ui.spec.ts
├── utils
│   └── environment.ts
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Design decisions

- One runner for API and UI automation.
- Separate API and UI specs for clear execution boundaries.
- Lightweight Page Object Model for login locators and actions.
- Test-scoped setup gives each UI test a fresh page and login state.
- Cross-browser projects reuse the same UI tests.
- Native HTML reporting avoids an unnecessary reporting dependency.
- No generic API client or service abstraction for a single endpoint.

## Important assumptions

OrangeHRM and Swagger Petstore are public demonstration services. Availability, credentials, data persistence and behaviour can change. Verify the OrangeHRM demo credentials before execution.

The Petstore v3 OpenAPI schema marks `name` and `photoUrls` as required and documents validation responses for invalid input. The negative test intentionally fails if the live service returns success or an undocumented status. This makes a contract discrepancy visible.

Run the tests against the live services before submission. Do not claim the project passes until that execution has completed successfully.
