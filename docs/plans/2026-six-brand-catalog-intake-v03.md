# Six-brand pilot — Briogeo mask, PATTERN and Redken static intake v0.3

**Status:** Updated 2026-11-20. Source ingredient records complete for the selected 14 PATTERN/Redken products, **provisional** static ChatGPT FR reviews. No paid OpenAI API calls made; no Supabase writes. Downloadable local package: `curlcode_pattern_redken_briogeo_v03.zip`.

## Briogeo
User supplied complete Ulta ingredient label for Don't Despair, Repair! Vanilla Birthday Cake Deep Conditioning Hair Mask; independently matched against [Ulta product page](https://www.ulta.com/p/dont-despair-repair-vanilla-birthday-cake-deep-conditioning-hair-mask-pimprod2053727?sku=2644377). It contains fatty alcohols and emollient oils, cationic conditioning ingredients, and hydrolyzed corn/wheat/soy proteins. Store **retailer verified** (not brand site or physical packaging verified). Draft supported FR01/04/09/10 and qualified FR06; do not claim demonstrated keratin repair. Briogeo 47-product intake is now patched for this record and two previously recovered medicated scalp records.

## PATTERN — 7 selected records
Ingredient lists for Hydration Shampoo, Breakage Barrier Mask, Repair360 Leave-In Foam have been obtained on official PATTERN pages; four others already captured with published INCI in the previous intake. All seven now have complete lists. Focus: distinct styling hold systems, leave-in conditioning, true cleansing as routine capability, and qualified breakage/repair claims. **Do not equate a manufacturer '2x less breakage' claim with independently reviewed methods.**

## Redken — 7 selected records
All Soft Shampoo, All Soft Conditioner, Acidic Bonding Conditioner, Acidic Bonding Leave-In, Acidic Bonding 5-Min Liquid Mask, Volume Injection Shampoo, and Volume Injection Conditioner now have complete published INCI lists transcribed from **product-specific Ulta listings**, with URLs and unmodified source list texts preserved. Redken's own pages give role and product-use details; pages can hide INCI behind interactive elements. Variant/region labels may differ; packaging is authoritative. Ordinary shampoo: routine cleanse, **not automatic FR25**. Acidic bonding: qualified repair mechanisms and qualified FR15 on leave-in where brand markets thermal protection. Conditioner volume/body: qualified FR27, not hair-diameter efficacy proof.

## Evaluation safeguards
- Accepted and qualified FRs are reviewer **proposals** to be confirmed, not scientifically validated finished-formula outcomes.
- Preserve original INCI and provenance; ingredient order is not concentration or quantitative efficiency.
- FRs describe mechanisms; formulation profile distinguishes richness, conditioning agents, polymers, deposition, styling role and coverage; user-specific suitability is separate.
- Cross-brand label-only vs formulation vs contextual recommender evaluation must use identical user profiles and product choices.
- The local catalog files are **not** yet imported to Supabase or committed in full to GitHub.

## Files
Download the local package `curlcode_pattern_redken_briogeo_v03.zip`: `pattern_redken_14_static_fr.json`, `briogeo_47_with_vanilla_INCI.json`, `review.csv`, `README.md`.

Next: audit product-category competition across six brands, reconcile any source variants, and assemble the dynamic recommendation benchmark before spending API credits.
