# End-to-End Tests

This directory contains Playwright e2e tests for the Music Terms Quiz App.

## Test Files

- **browse-terms.spec.ts** - Tests for the Browse Terms page including:
  - Displaying terms
  - Grade filtering
  - Search functionality (by term, definition, example)
  - Combined search and filter

- **quiz.spec.ts** - Tests for the Quiz page including:
  - Starting a quiz
  - Answering questions
  - Progress tracking
  - Quiz completion
  - Grade filtering for quiz

- **language-switching.spec.ts** - Tests for language switching including:
  - Switching between English and Chinese
  - UI updates when language changes
  - Search functionality in different languages

- **navigation.spec.ts** - Tests for navigation between tabs:
  - Switching between Browse and Quiz tabs
  - State persistence
  - Content visibility

## Running Tests

### Install Dependencies

First, install Playwright browsers:
```bash
npx playwright install
```

### Run All Tests

```bash
npm run test:e2e
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:e2e:headed
```

### Run Specific Test File

```bash
npx playwright test e2e/browse-terms.spec.ts
```

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The tests are configured in `playwright.config.ts`:
- Base URL: `http://localhost:3000`
- Automatically starts dev server before tests
- Tests run in parallel by default
- Retries failed tests 2 times on CI

## Writing New Tests

When writing new tests:
1. Use descriptive test names
2. Wait for elements to be visible before interacting
3. Use `page.waitForTimeout()` sparingly - prefer waiting for specific elements
4. Test both English and Chinese language variants when applicable
5. Clean up state between tests using `test.beforeEach()`

## Debugging Tests

To debug a failing test:
1. Run in headed mode: `npm run test:e2e:headed`
2. Use UI mode: `npm run test:e2e:ui` for step-by-step debugging
3. Add `await page.pause()` in your test to pause execution
4. Check the HTML report generated after test runs

