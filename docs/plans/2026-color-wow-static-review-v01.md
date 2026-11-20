# Color Wow — 33-product static review intake (2026-11-20)

**Status:** Provisional ChatGPT-assisted review of the locally cleaned 33-product scrape; **no product-page-by-product-page live verification** or finished-formula tests performed. Source files are in downloadable local `color_wow_static_review_v01.zip`, not stored in this GitHub repo.

## Scope
- Reviewed all 33 named Color Wow products from the pre-existing `color_wow_products_step1.json` scrape (cleaned description, directions, ordered INCI).
- Draft reference catalog has **60 proposed accepted FR assignments**, **48 qualified FR candidates** spread across 33 products, and non-FR capabilities/role qualifiers. Neither count indicates efficacy.
- Marked all product outputs as `provisional_needs_source_verification` pending reviewer confirmation and original-page attribution checks.
- **16 product descriptions** retain heat-protection wording; no automatic FR15 approval based solely on the label. Preserve separate `qualified_fr` rather than conflating claims with verified performance.

## Product-role parser issue
The existing script contains broad substring shampoo heuristics and keeps previously assigned `type`; this can misclassify **Snag-Free Pre-Shampoo Detangler** as shampoo. A tested local demo `product_role_rules.py` uses precedence over the whole name and usage instructions: pre-shampoo detangler before shampoo, dry shampoo before shampoo, and correctly handles root concealer/toning foam. **Not yet merged into production scraping code.**

## Patterns / reviewer decisions to preserve
- Generic shampoos: cleansing as `hair_cleansing` capability, no automatic clarifying FR25.
- Scalp dry shampoo absorption does not establish altered sebum production FR17.
- Film formers may retain curl geometry or root lift; do not conflate curl silhouette preservation with increased hair-fiber diameter. Store mechanics as specialized capabilities.
- Dramatic hair growth, structural repair, quantified anti-breakage, humidity and thermal-protection assertions must be supported by credible appropriate evidence, not just INCI or promotional language.
- Heat-activated Dream Coat uses different application and film mechanism than spray for curly hair; root powder coverage is not a hair-benefit FR.
- Dream Filter is mineral-pretreatment, normally followed by shampoo; do not confuse a chelating pretreatment with standalone shampoo.
- Non-FR capabilities needed: color neutralization/toning, temporary root coverage, mineral chelation, drying-time reduction, localized smoothing, root lift.

## Workflow
1. Review corrected product-role assumptions and high-risk claims against the exact source URLs.
2. Accept/modify provisional FRs by functional groups with human confirmation; leave unresolved product claims qualified.
3. Prepare static Briogeo and Camille Rose catalogs.
4. Evaluate the same multi-brand catalog and profiles under label-only vs formulation-informed vs full contextual recommendation engines. Reserve API calls for this dynamic comparison.

**Related:** [TGIN consolidation](../plans/2026-tgin-v02-color-wow-intake.md), [static catalog ADR](../decisions/0004-static-reviewed-fr-catalog.md).
