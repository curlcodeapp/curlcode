# CurlCode catalog transition — TGIN v0.2 and Color Wow intake (2026-11-20)

**Decision:** Use ChatGPT-assisted reviewed static FR annotations for initial catalog, reserve paid OpenAI API usage for dynamic user-to-product recommendation comparisons. Do not interpret reviewer decisions as experimental finished-formula proof.

## TGIN consolidation
- 38 products preserved in downloadable local `curlcode_catalog_transition_v02.zip`, with `tgin_reference_v02_consolidated.json` and CSV.
- Preserve `original_v01_fr` separately from `accepted_fr`, `qualified_fr`, review exclusions, exceptions and user decisions. Specific approvals are explicit; other group-reviewed proposals remain provisional.
- User decisions: Sweet Honey Hair Milk +FR09; Rose Water Smoothing Leave-In +FR24; Rose Water Hydrating Styling Lotion -FR11, qualified FR29; Honey Curls Custard +FR24; Rose Water Curl Defining Styling Gel qualified FR27; CPR Protein Treatment qualified FR06; 3-N-1 Heat Protectant qualified FR15.
- FR01 is retained for rinse-off hydrating masks with contact-time context. Honey Miracle Hair Mask Packette has mismatched original ingredient listing and requires source verification.
- FR08 is **not** added to oil-based anti-breakage serum or all oils merely because they lubricate fibers; separate application/weight metrics from proven reduction in mechanical breakage.
- **Volume nuance:** curl-definition/hold can preserve apparent silhouette/fullness through maintaining curl geometry, without increasing single-strand diameter. Store `curl_shape_volume_preservation` as context-specific capability; FR27 is qualified for Rose Water Curl Defining Styling Gel based on volumizing claim and plausible styling-polymer support, not proven fiber thickening. Do not equate this with root lift or strand-coating thickening.
- Original reviewed wax stick, scalp exfoliator and scalp serum retained. Many other assignments remain inference-based and should not be marked independent-science-validated.

## Color Wow intake
- Reused 33 original `ColorWow/color_wow_products_step1.json` records; 33 descriptions were wrapped in scraped structured-text metadata. Extracted the leading JSON string into a clean description while retaining full raw text. Removed **89,627** extraneous trailing description characters across 33 items.
- **16** clean descriptions still include heat/thermal protection wording; this is a source-attribution review queue, **not** proof of heat protection or scraper contamination by itself.
- Known role anomalies from raw data: Snag-Free Pre-Shampoo Detangler typed shampoo, Extra Strength Dream Coat typo `syler`, `other` types requiring deliberate subtype mapping.
- Source verification of each claim, directions and INCI against the corresponding original product URL is still pending; no Color Wow FR classifications have been approved.
- Downloadable package includes cleaned JSON and review CSV. No API calls required.

## Next
1. Review Color Wow roles and high-risk source claims (especially heat protection), then curate product FRs in product-function groups.
2. Normalize Briogeo and Camille Rose; verify meaningful category competition across four brands.
3. Use identical products and user profiles to test label-only vs formulation-aware vs contextual personalization (and optional general LLM baseline), blinded review and safety/evidence checks.
