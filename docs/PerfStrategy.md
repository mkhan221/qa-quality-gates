# Performance Test Strategy

## Objective
The objective of this performance testing effort is to validate that critical user-facing and system-critical API endpoints meet acceptable performance and reliability standards before release. These tests act as a quality gate to prevent regressions that could impact user experience or system stability.

## System Under Test
- Application: Fake Store API
- Base URL: https://fakestoreapi.com

## In-Scope Endpoints
The following endpoints were selected based on their importance to core user flows and system functionality:

1. GET /products  
   - Purpose: Retrieves the product catalog used for browsing and discovery.
   - Reason for inclusion: High-traffic endpoint critical to user engagement.

2. GET /products/1  
   - Purpose: Retrieves product detail information.
   - Reason for inclusion: Required for product evaluation and conversion-related actions.

3. POST /auth/login  
   - Purpose: Authenticates a user and returns a token.
   - Reason for inclusion: Authentication failures block all protected actions and indicate system instability.

## Test Types

### Smoke Performance Test
- Goal: Verify basic stability and responsiveness under minimal load.
- Load profile: 1–5 virtual users.
- Duration: Short execution.
- Usage: Early validation and CI sanity checks.

### Baseline Performance Test
- Goal: Validate system behavior under expected steady-state load.
- Load profile: 10–20 virtual users.
- Duration: Sustained execution.
- Usage: Release gating and regression detection.

## Performance Thresholds

The following thresholds define pass/fail criteria for all performance tests:

- Error rate: Less than 1%
- Check pass rate: Greater than 99%
- 95th percentile response time (p95):
  - GET /products: ≤ 800 ms
  - GET /products/1: ≤ 800 ms
  - POST /auth/login: ≤ 1000 ms

These thresholds are based on reasonable user experience expectations for a public API, accounting for network variability while still enforcing meaningful performance standards.

## Pass/Fail Criteria
A test run is considered a failure if:
- Any defined threshold is breached.
- Error rate exceeds acceptable limits.
- Critical checks fail.

Failed tests block the CI pipeline and indicate the build is not release-ready.

## Out of Scope
- Stress testing beyond baseline load.
- Long-duration soak testing.
- Security or penetration testing.
