# CurlCode — Full TGIN Catalog Pilot v2.3 (2026-11-19)

**Status:** local batch package built and locally tested; live full-catalog OpenAI enrichment NOT executed. See [hybrid v2.1 plan](./2026-hybrid-fr-enrichment-v21.md) and [evidence audit](./2026-enrichment-v2-evidence-audit.md).

## Completed
- Inspected `curl_code/data/raw/TGIN/tgin_products_step1.json` from the owner's existing ZIP: **38** products; every record has nonempty name, URL, description, directions, ingredients.
- Prepared a general role-gated pilot runner for 16 role categories (cleansers, co-wash, leave-in, rinse-out/deep/protein conditioning, stylers, finishing waxes, oils, scalp treatments, heat protectant).
- Reused three human-reviewed pilot assessments **without new API calls**, and retained FR24 for the wax stick from the repeatable v2.2 classification. Reviewed assignments remain claims of functional plausibility, not finished-formula efficacy proof.
- Flagged three products for specific review (hair/scalp oils and hair/body oil, including unusually short ingredient list).
- Source hashes, role labels, model outputs, usage, exceptions, and checkpointing built into local JSON output. Tests: **5/5 passed**.
- No OpenAI keys stored or provided. Full batch needs user-run commands in the local package and source review.

## Quality caveats
- The 16 role maps are **provisional**, not a replacement for canonical ProductCategories/StyleMechanisms/InputModifiers/ConflictRules mappings.
- Eligibility gating can prevent false positives but can also hide genuine multipurpose functions. Manually inspect exceptions and novel types.
- Review all enriched results rather than treating accepted FRs as authoritative.
- Existing TGIN raw fields were checked for completeness; page-by-page claim provenance and independent literature validation are **not** done.
- Color Wow's 33 records require source attribution checks before scaling. Briogeo has 48 raw products (some missing fields), Camille Rose's repaired dataset has 63; they are not yet enriched in this v2.3 pilot.

## Operational next steps
1. User executes 5-item TGIN API pilot, inspects statuses and specific unexpected FRs.
2. Continue resumable full eligible TGIN batch; audit exceptions.
3. Source-verify Color Wow, then generalize pipeline across 4-brand catalog.
4. Create ~10 user contexts and run matched catalog A/B/C engines (claims-only, formulation-aware, fully contextual); use blind expert review and negative controls.

The local package is titled `curlcode_tgin_full_catalog_v23.zip`. GitHub stores design/status, not API credentials or large scraped datasets.
