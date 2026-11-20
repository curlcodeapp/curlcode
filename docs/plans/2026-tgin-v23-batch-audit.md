# TGIN full-catalog v2.3 — first-pass audit and next gate

**Status:** Initial batch complete on user's Mac, 2026-11-20. **Not approved for recommendations.**

## Reported batch outcome
- **38 records** in catalog; **32 API-enriched**, **3 carried-forward human-reviewed**, **3 flagged for source/role review**.
- Flagged: Miracle Styling Ayurvedic Hair & Scalp Oil (`scalp_hair_multirole_review`); Tea Tree + Olive Oil Detoxifying Hair & Scalp Serum (`scalp_hair_multirole_review`); 100% Extra Virgin Coconut Oil Hair & Body Serum (`very_short_inci;hair_body_multirole_review`).
- Rose Water Curl Refresher was marked `setting_styler` despite explicit role-mismatch review pointing toward leave-in curl refresher.

## Systematic QA findings (based on inspection of console output, not original source pages)
1. **Gentle cleansers falsely treated as clarifiers:** Strengthening, Moisture Rich and Rose Water Hydrating Shampoos all have FR25. This should not follow merely from cleansing. Store `hair_cleansing` routine capability separately from FR25; FR25 requires specific residue/buildup removal evidence. Do not auto-delete FR25 from every gentle cleanser if exceptional evidence exists.
2. **Styler FR inflation:** Water Activated Curl Elongating Gel (13 FRs), Rose Water Hydrating Curl Cream (13), Rose Water Hydrating Styling Lotion (12), plus various leave-ins have similar repeated FR09/10/13/14/23/24 labels. Audit actual intended function, application, ingredient mechanism and evidence; prevent ingredient presence alone from accepting FRs.
3. **Volume inference:** FR27 on curl elongation/definition products is a review trigger, not automatically appropriate; application techniques (e.g. diffusing) must not be conflated with product-intrinsic volumizing effects.
4. **Role and dependency:** Resolve multipurpose application areas and cleanse/clarify distinctions prior to recommendations.

## Recommended immediate actions
- Freeze and back up raw v2.3 outputs and source hashes. Do not change underlying evidence retroactively.
- Run a **zero-new-API-call QA pass** grouped by roles, summarizing accepted FR frequencies, unusual combinations, product type inconsistencies, FR25 on gentle cleansers, FR13 without meaningful humidity evidence, FR27 on elongation stylers, redundant packette entries and scalp-specific FRs on hair-only products.
- Mark FRs as `approved`, `needs_review`, `rejected`; maintain both raw model proposals and reviewed assignments.
- Apply **general constraints** (not exact per-product hard-coded lists), and validate on a small multi-role / cross-brand sample before attempting automatic correction or expanding to Color Wow.
- Product source verification is still needed for scraped Color Wow data; do not use its contaminated claims to evaluate model science.

## Scientific limits
Initial FR assignment lists reflect model proposals, not measured performance. External scientific evidence retrieval and validated finished-formula efficacy evidence have not been completed. Recommendation value still needs a matched comparison with label-only on at least four brands and several user profiles.

## Follow-on
Prepare source-audited four-brand catalog (TGIN, Color Wow, Briogeo, Camille Rose), profile test cases and three-engine experiment using identical products/profiles. Prioritize genuine choice within each function over raw brand count.
