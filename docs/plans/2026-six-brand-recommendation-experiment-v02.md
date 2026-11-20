# CurlCode recommendation pilot v0.2 — runnable controlled comparison

**Date:** 2026-11-20. **Status:** Prepared locally and tests passed; **NO OpenAI recommendation API calls yet executed**. Supersedes v0.1 input-preparation notes for actual first runs.

## Deliverables

Local user-downloadable `curlcode_recommendation_pilot_v02.zip` holds:
- `pilot_products.json`: 16 unique product records from five brands, chosen from 195 six-brand inventory rows with available label, directions and INCI.
- `frozen_trials.json`: six controlled, profile-specific comparisons. Group size 2–3 products and at least two brands, aligned by intended task where possible.
- `profiles_10.json`: existing ten synthetic profiles, unchanged.
- `compare_engines.py`: OpenAI Responses API client, **dry-run by default**; explicit `--run` makes calls. A (labels only), B (labels+formulation/FRs), C (same data as B with explicit contextual interaction reasoning), consistent candidate IDs/user profiles. Structured JSON output; product-ID validation; usage logging.
- `SCORING_RUBRIC.csv` and `SCORING_INSTRUCTIONS.md`: blind manual review across functional and application fit, evidence honesty and user fit; quantify unsupported claims.
- `source_fields_to_complete.json`: 7 PATTERN and 7 Redken product records whose normalized manufacturer claims/use instructions are still blank; **excluded from first paid run** rather than inventing inputs.
- Coverage and limitations recorded in README.

## QA performed
- Six comparisons are source-field complete and each has at least two brands.
- All 18 (six scenarios × three modes) generated payloads pass offline structural tests.
- No API secret copied to files and no API usage incurred by preparation.

## Constraints
- T06 mixed curl-definition versus root-lift/volumizing formats is a **technique-fit stress test**; products are not direct same-stage substitutes. T04 styling aids vary, and exposure type must be checked. The pilot does not prove efficacy.
- All existing FR classifications remain partly provisional. Do not call any product's efficacy validated merely because ingredient INCI is available.
- Six-brand comparison is **not complete** until PATTERN and Redken manufacturer descriptions/directions, variants, duplicates and role corrections are verified.
- Model availability/cost and actual responses are to be checked and logged during local API trials. Compare A/B/C paired outputs with blind evaluation; don't score by agreement with ChatGPT automatically.

## Suggested first test on Mac
`python3 test_pilot.py`, `python3 compare_engines.py --trial T03` (no paid usage), then `python3 compare_engines.py --trial T03 --modes A,B,C --model gpt-5.4-mini --run` when budget/model confirmed.

**Related:** [v0.1 scientific / experiment plan](./2026-six-brand-recommendation-experiment-v01.md).
