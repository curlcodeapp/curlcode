# Briogeo static intake + two new brand pilots (2026-11-20)

**Status:** Briogeo source intake completed and **provisional role-based FR candidates only**; no accepted labels certified. Initial Pattern Beauty and Redken discovery targets selected. No paid OpenAI API calls made.

## Briogeo initial audit
- Existing source: `curl_code/data/raw/Briogeo/briogeo_products.json` from user's archive.
- **48 rows**, including **one non-product cookie-consent page**, hence **47 real product rows**.
- Missing fields: **4 rows without ingredients** (three real products + the cookie artifact); one without description and directions (the cookie artifact).
- **33 distinct normalized family keys** among 47 product rows; **26 rows share a family key with another row**, frequently sizes/travel products. These are heuristic family keys, not proven duplicate INCI.
- Serious role mistakes: leave-in conditioner listed as rinse conditioner, blow-dry heat cream listed `other`, scalp exfoliating shampoo listed scalp treatment, and styling/mist roles lumped together.
- Draft static candidate catalog generated: **60 possible accepted** and **41 qualified** FR nominations. These are **category-level initial hypotheses** intended for reviewer work, **not product-by-product substantiated classifications**. Source-page/INCI review needed before any promotion to catalog-approved.
- High-risk claims: dandruff/salicylic-acid products, caffeine/biotin density serum, bonding/repair and heat protectant claims; no medical or laboratory outcomes established.
- Local package `curlcode_briogeo_and_new_brands_v01.zip` includes raw preserved JSON, intake QA CSV, role hypotheses, conservative candidate FR review CSV/JSON, and new-brand target sheet. Large catalog data not committed to GitHub.

## Two new brands for diversity
1. **PATTERN Beauty** — textured-hair products (leave-in, gel, styling cream, shampoo, mousse) for genuine TGIN/Camille Rose/Briogeo competition, rather than brand name alone.
2. **Redken** — salon-style repair/conditioning, heat and volume options. Many pages need not be Shopify: an official product page plus its visible source fields is enough for a curated 7-product pilot; code can adapt brand-specific extraction and manual QA.

Candidate list has 7 PATTERN and 7 Redken targets, official pages/collection entry points, and explicit `not scraped / INCI not verified / FR not assigned` status.

## Validation plan
- Fix Briogeo missing INCI and variants; review proposed roles and static FRs with same FR standards applied to TGIN, Color Wow and Camille Rose.
- Collect exact official fields for two new brands using a **small, curated** target set; don't promise full scraping of huge catalogs.
- Run a **six-brand** comparison pool with enough same-function, different-formulation alternatives. Include cost/price and availability only when source-grounded.
- Reserve API spend for contextual personalized recommendation experiments, and keep label-only comparison provided the same user profile and catalog.

## Note on representation
Product page claims, ingredient plausibility and finished-product efficacy are distinct. Provisional candidate FR counts do not measure intelligence accuracy.
