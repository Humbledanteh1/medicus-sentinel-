# MEDICUS Sentinel validation plan (draft)

## Scope
Evaluate whether implemented rules detect explicitly defined pre-analytical hazards in a synthetic set. This is software verification, not clinical validation.

## Phase 0 — specification
- Assign a laboratory owner to every rule.
- Document specimen type, method, test-specific limitations, SOP source, effective date, and approver.
- Distinguish hard stops from advisory warnings.
- Prohibit silent fallback when a required data source is unavailable.

## Phase 1 — software verification
- Unit-test each rule, boundary value, missing field, invalid timestamp, and conflicting input.
- Verify reproducibility for identical case and code versions.
- Test export, audit event integrity, browser compatibility, and failure states.

## Phase 2 — synthetic benchmark
- Freeze cases and reference labels before comparing versions.
- Include positive/negative examples, borderline values, missingness, conflicting metadata, and outages.
- Report sensitivity, specificity, PPV, NPV, false-negative/positive counts, alert burden, and confidence intervals.
- Do not treat generated labels as independent evidence of real-world performance or optimize thresholds solely against synthetic cases.

## Phase 3 — retrospective evaluation
- Use institutionally approved, appropriately de-identified data under governance.
- Have qualified reviewers independently adjudicate disagreements and misses.
- Split development/evaluation data by time or site where appropriate to reduce leakage.
- Report performance by test, specimen type, analyser, source system, and relevant groups when sample sizes support it.

## Phase 4 — shadow mode
- Run without changing specimen disposition or clinical workflow.
- Compare flags with routine catches and independent review.
- Measure false-positive burden, missed hazards, review time, overrides, and workload.
- Set acceptance criteria prospectively with laboratory leadership.

## Phase 5 — controlled pilot (only after approvals)
- Keep final disposition with authorized laboratory staff.
- Use versioned rules, access controls, tamper-evident audit logs, rollback, incident response, and downtime procedures.
- Monitor drift and alert fatigue; define stop criteria in advance.

## Non-negotiable safety principles
- No autonomous result release or treatment recommendation.
- Never infer missing identity or resolve an identity conflict by guesswork.
- Do not apply one H-index threshold to every analyte or method.
- An outage must be visible; unavailable checks must not be represented as passed.
- Human review alone does not guarantee exemption from medical-device regulation.
