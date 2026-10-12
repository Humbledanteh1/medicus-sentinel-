# MEDICUS Sentinel

An early-stage, browser-based research prototype for laboratory specimen quality review and transparent multi-agent simulation.

## Status
**Prototype only — not for clinical use.** The app uses fictional cases and deterministic heuristics. Version 0.4 adds an in-memory, version-tagged audit trail for synthetic agent outputs. Its tournament measures the behavior of implemented rules, not the clinical competence of real AI models.

## Quick start
1. Open `index.html` in a modern browser.
2. Select a fictional case or run the tournament across all cases.
3. Inspect agent outputs, disagreements, and metrics.
4. Export a JSON report or agent-metrics CSV.

No build step, server, account, API key, or external browser dependency is required. To run regression tests, install Node.js 18+ and run `npm test`.

## Included
- Specimen Sentinel: identity, tube, volume, stability, H-index, clot, QC, freshness, and system-availability checks.
- Laboratory Guardian: independent analytical/process-quality checks.
- Investigator: cautious case hypotheses based on synthetic facts.
- Evidence Agent: routes to approved SOP/evidence and avoids fabricated citations.
- Adversary: challenges unsupported conclusions and unsafe release suggestions.
- Judge: conservative synthesis that preserves hard stops and does not use majority vote to override safety.
- Twelve hand-authored fictional cases and a repeatable tournament.
- Per-agent confusion-matrix-style metrics against synthetic reference labels.
- JSON and CSV export, including the current in-memory audit trail in the JSON report.
- Versioned in-memory audit events for each agent output; these are demonstration logs, not persistent or tamper-evident records.

## Safety and governance
- Never enter patient-identifiable or real clinical information.
- Do not use this prototype to diagnose, treat, release, reject, or recollect real specimens.
- Thresholds and case labels are illustrative and require local expert review.
- Human review is mandatory in any future operational design.
- Real deployment requires validated procedures, privacy/security review, auditability, risk management, monitoring, and regulatory assessment. Human review alone does not determine regulatory status.

## Developer checks\n\nRun automated regression tests with `npm test` (Node.js 18+). See [`docs/TESTING.md`](docs/TESTING.md) for test coverage and limitations.\n\nSee [`docs/VALIDATION_PLAN.md`](docs/VALIDATION_PLAN.md) for a proposed validation pathway.
