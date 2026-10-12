# MEDICUS Sentinel

An early-stage, browser-based research prototype for laboratory specimen quality review and transparent multi-agent simulation.

## Status
**Prototype only — not for clinical use.** The app uses fictional cases and deterministic heuristics. Its tournament measures the behavior of implemented rules, not the clinical competence of real AI models.

## Quick start
1. Open `index.html` in a modern browser.
2. Select a fictional case or run the tournament across all cases.
3. Inspect agent outputs, disagreements, and metrics.
4. Export a JSON report or agent-metrics CSV.

No build step, server, account, API key, or external dependency is required.

## Included
- Specimen Sentinel: identity, tube, volume, stability, H-index, clot, QC, freshness, and system-availability checks.
- Laboratory Guardian: independent analytical/process-quality checks.
- Investigator: cautious case hypotheses based on synthetic facts.
- Evidence Agent: routes to approved SOP/evidence and avoids fabricated citations.
- Adversary: challenges unsupported conclusions and unsafe release suggestions.
- Judge: conservative synthesis that preserves hard stops and does not use majority vote to override safety.
- Twelve hand-authored fictional cases and a repeatable tournament.
- Per-agent confusion-matrix-style metrics against synthetic reference labels.
- JSON and CSV export.

## Safety and governance
- Never enter patient-identifiable or real clinical information.
- Do not use this prototype to diagnose, treat, release, reject, or recollect real specimens.
- Thresholds and case labels are illustrative and require local expert review.
- Human review is mandatory in any future operational design.
- Real deployment requires validated procedures, privacy/security review, auditability, risk management, monitoring, and regulatory assessment. Human review alone does not determine regulatory status.

See [`docs/VALIDATION_PLAN.md`](docs/VALIDATION_PLAN.md) for a proposed validation pathway.
