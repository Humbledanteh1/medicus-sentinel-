# Automated tests

## Run locally

Install Node.js 18 or later, clone the repository, then run:

```bash
npm test
```

The tests load the actual case definitions and pure rule functions from the script embedded in `index.html`, while skipping browser-only UI initialization. No dependencies are installed.

## Current coverage

- Twelve synthetic cases have unique identifiers.
- Identity mismatches trigger a Sentinel and Judge flag.
- A clean synthetic case does not trigger a hard stop.
- The illustrative potassium H-index rule fires on its configured case.
- Missing timing is not silently treated as a passed stability check.
- Every hand-authored HOLD case is flagged by current Sentinel/Judge rules.
- Confusion-matrix counts reconcile with the number of evaluated cases.
- Repeated evaluation of a case is deterministic.
- Audit events include case ID, agent, rule version, timestamp, flag, rationale, and a synthetic-only marker.

## Limitations

These are software regression tests for the current implementation and its own synthetic examples. The in-memory audit trail is not persistent or tamper-evident. These tests do not establish clinical validity, test a real analyser/LIS integration, or independently validate the reference labels. As the rules evolve, add boundary tests, negative cases, property-based tests, and independently adjudicated validation datasets under appropriate governance.
