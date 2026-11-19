# 1. Overview

The technical exercise specifically recommends implementing a limited number of automated tests while describing additional scenarios that would be prioritised in a real-world implementation.

For that reason, the focus was placed on:

- Framework design
- Code organisation
- Positive and negative testing
- Maintainability
- Reporting and debugging
- API versus UI testing strategy

# 2. Framework Design Decisions

| Choice                          | Rationale                                                      |
| ------------------------------- | -------------------------------------------------------------- |
| TypeScript                      | Static typing, readable code and editor support                |
| Playwright Test                 | One runner supports browser automation and direct API requests |
| Page Object Model               | Keeps UI selectors and interactions out of test specifications |
| Environment Variables           | Separation of configuration from implementation                |
| Separate API/UI specs           | Makes each target easy to identify and run                     |
| Native Playwright HTML reporter | Interactive reporting without an extra reporting dependency    |
| Trace and screenshot on failure | Useful diagnostics for intermittent failures                   |

## 3. Implemented UI coverage — OrangeHRM login

Login is one of the most important user journeys in any application.

The scenario demonstrates:

- Navigation
- User interaction
- Authentication
- Assertions
- Page Object Model usage

| ID    | Scenario                            | Expected result                                                    | Priority |
| ----- | ----------------------------------- | ------------------------------------------------------------------ | -------- |
| UI-01 | Valid username and password         | Dashboard route and Dashboard heading are visible                  | P1       |
| UI-02 | Valid username and invalid password | `Invalid credentials` alert is visible; user remains on login page | P1       |

`LoginPage` encapsulates locators and login interactions. A test-scoped fixture opens a fresh login page before each scenario. Navigation uses `waitUntil: 'commit'` because the public demo can be slow to load dependent assets; the test then waits for the username and password controls. This is condition-based waiting, not a fixed sleep.

The positive scenario verifies both the dashboard URL and visible heading. The negative scenario verifies the accessible alert role, message and login URL.

### Additional UI scenarios

| Priority | Scenario                                       | Approach and rationale                                  |
| -------- | ---------------------------------------------- | ------------------------------------------------------- |
| P1       | Invalid username with valid password           | Reuse the login page object and verify rejection        |
| P1       | Invalid username and password                  | Verify invalid credentials cannot authenticate          |
| P1       | Both fields empty                              | Verify required-field validation                        |
| P1       | Username empty / password populated            | Verify username validation                              |
| P1       | Password empty / username populated            | Verify password validation                              |
| P1       | Direct Dashboard access without authentication | Use a fresh context and verify redirect to login        |
| P1       | Logout then revisit Dashboard                  | Verify session termination and protected-route handling |
| P2       | Forgot-password navigation                     | Verify recovery route and page state                    |
| P2       | Whitespace and casing variations               | Check input handling against product rules              |
| P2       | Long values and special characters             | Check robust rendering and validation                   |
| P2       | Session expiry                                 | Verify re-authentication is required                    |
| P3       | User Search                                    | Core business functionality                             |
| P3       | Search with No Results                         | Empty state validation                                  |
| P4       | Add User                                       | Administration workflow                                 |
| P4       | Duplicate User                                 | Validation rules                                        |

## 4. Implemented API coverage — Swagger Petstore v3

The Create Pet endpoint was selected because it validates a complete business transaction within a single test.

It provides coverage of:

- Request construction
- Response validation
- Status code verification
- Business object verification

### OpenAPI resources:

- https://petstore3.swagger.io/api/v3/openapi.json
- https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml

The Pet schema marks `name` and `photoUrls` as required. The `status` property is documented with `available`, `pending` and `sold`. The POST operation documents HTTP 200 success and HTTP 400 / 422 invalid-input or validation responses.

| ID     | Scenario                              | Expected result                                           | Priority |
| ------ | ------------------------------------- | --------------------------------------------------------- | -------- |
| API-01 | Create Pet with valid required fields | HTTP 200, JSON response and returned fields match request | P1       |
| API-02 | Create Pet with invalid payload       | Documented validation response, HTTP 400                  | P1       |

The API tests use Playwright's `request` fixture. A timestamp-based ID and name reduce collisions on the shared demo service. The positive case verifies status, JSON content type and returned Pet fields.

The negative case providing schema required id as integer to a string to isolate one contract violation. It asserts documented validation statuses rather than merely asserting “not 200”, which would incorrectly allow unrelated 500 errors. If the live service returns 200 or an undocumented status, record this as a contract discrepancy; do not weaken the assertion to accept arbitrary failures.

### Additional API scenarios

| Priority | Scenario                                | Approach and rationale                         |
| -------- | --------------------------------------- | ---------------------------------------------- |
| P1       | Omit required `photoUrls`               | Isolate the other required Pet field           |
| P1       | Unsupported `status` value              | Check enum validation against OpenAPI          |
| P1       | Get Non-Existent Pet                    | Verify not-found response and error handling   |
| P1       | Get Existing Pet                        | Verify persistence and retrieval functionality |
| P2       | Update an existing Pet                  | Verify updated fields and response             |
| P3       | Invalid Update Payload                  | Validation coverage                            |
| P2       | Delete an existing Pet                  | Verify resource lifecycle                      |
| P2       | Invalid JSON / unsupported content type | Verify parsing and media-type handling         |
| P2       | Boundary values for IDs and names       | Verify boundary handling                       |
| P3       | Large payload                           | Explore payload limits and service robustness  |
| P3       | Special Characters                      | Data and service robustness                    |

# 5. API versus UI test-layer rationale

UI automation should cover a small number of high-value user journeys: successful authentication, visible error feedback and navigation. These tests demonstrate that the browser, frontend and backend work together from the user's perspective.

Where a suitable API exists, data permutations and business-rule validation are generally better tested at the API/service layer. API tests are faster and less dependent on rendering and browser timing. For example, validating many Pet payload variations does not require a browser.

A balanced strategy is:

- UI: critical end-to-end journeys and visible user feedback.
- API: request validation, response codes, response schemas and resource operations.
- Unit/lower-level: pure validation rules and edge cases where those tests are available.

API tests do not replace UI tests because they cannot prove that a user can operate the interface or see the correct message.

# 6. Challenges

| Challenge                     | Resolution                                          |
| ----------------------------- | --------------------------------------------------- |
| Dashboard locator instability | Replaced with a more reliable verification strategy |
| False UI failures             | Improved locator selection and assertions           |
| Page load time                | Native Playwright                                   |
| Failure investigation         | Enabled screenshots, videos and traces              |
| Growing execution artefacts   | Added cleanup before test execution                 |

# 7. Trade-Offs

This exercise recommends implementing a limited number of tests.

Rather than maximising coverage, I focused on demonstrating:

- Clean framework structure
- Positive and negative testing
- Documentation
- Reporting
- Debugging capability
- Maintainable automation patterns

Additional scenarios have been prioritised and documented to illustrate how coverage would evolve given additional time.
