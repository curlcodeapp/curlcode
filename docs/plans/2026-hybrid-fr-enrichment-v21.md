# CurlCode — Hybrid FR Enrichment v2.1 pilot (2026-11-19)

**Status:** pilot implementation prepared; **live OpenAI v2.1 re-test not yet run**, so do not claim improved model accuracy or cost until measured.

## Why identical inputs produced different FRs
Generative model outputs are probabilistic and semantically ambiguous; the previous prompt assessed many possible FRs per run. Even with schema-constrained output, the model could choose different accepted vs conditional classifications, and the previous benchmark did not enforce canonical product-role constraints after model output. A fixed set of FR eligibility constraints and deterministic post-validation can reduce, but cannot guarantee elimination of, variability.

## Pilot implementation
The downloadable `curlcode_enrichment_v21_pilot.zip` contains a Python standard-library runner `ai_benchmark_v21.py`, tests, and a README. It is a **local pilot package, not yet production-integrated app code**.

- Deterministically infer provisional product roles from name/directions (wax stick local finisher, scalp exfoliator, pre-wash scalp serum); role `other` remains open and must be reviewed.
- Give the AI only FR definitions allowed for the role, rather than asking it to rationalize all FR01–FR29.
- Return only accepted FR identifiers; explain conditional FRs with a concise reason and missing evidence; omit irrelevant/rejected FRs. Record pre-cleansing roles as capabilities and prerequisite steps, not standalone FR25.
- Deterministic post-validator rejects FRs outside the allowed role map and hard-filters clearly inapplicable assignments.
- Preserve raw model result plus final vetted decisions, role, optional model usage data, and review flags.
- Local tests cover wax false positives, scalp-serum shampoo dependency, exfoliator false positives, unknown-role fallback and conditional filtering.

## Important limitations
- These gates are **provisional role heuristics**, not the authoritative ProductCategories eligibility matrix. Before whole-catalog enrichment, reconcile with the official FR workbook, allow legitimate multi-role formats and a human exception queue. A fixed generic wax-stick exclusion must not silently reject a genuinely unusual product.
- Scientific literature retrieval, product-specific finished-formula testing and verified ingredient-to-FR evidence weighting are not yet implemented. Claims and INCI alone are not proof of efficacy.
- Cleaned Color Wow descriptions remain source-unverified. Do not interpret benchmark matches as scientific validation.
- The original 50 assertions include disputed items (such as wax stick FR28); freeze a separately reviewed v2 benchmark, retain historical scores, and compare accepted-FR false positives as well as omissions.
- The real OpenAI re-test and repeatability comparison require locally configured API credentials; perform and log before advancing to catalog-wide inference.

## Next check
1. Execute three-product v2.1 run; examine accepted and conditional results, especially wax FR09/11, scalp serum FR18/25.
2. Run 2 repeats of the same 3 products, compare saved output and token usage.
3. If acceptable, reconcile FR category rules, provenance and evidence constraints, then enrich more products across TGIN + Color Wow, followed by Briogeo + Camille Rose.
4. Validate user-profile recommendations against label-only and formulation-aware baselines with matched products and profiles.

See [v2 evidence plan](./2026-enrichment-v2-evidence-audit.md) and [AI architecture ADR](../decisions/0003-hybrid-ai-mvp.md).
