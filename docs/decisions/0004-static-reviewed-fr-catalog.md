# ADR-0004 — Static, ChatGPT-reviewed FR catalog for four-brand validation

**Status:** Accepted as pilot direction, 2026-11-20. Supersedes the scheduled batch AI enrichment approach of ADR-0003 for the initial catalog only. Retains API-based dynamic personalized recommendations.

## Decision
Stop additional OpenAI API calls for *static product FR classification* during the initial four-brand pilot. Reuse validated raw product records and earlier AI proposals as inputs, but use ChatGPT-assisted explicit review to author a **versioned, static product intelligence catalog**. Distinguish user-approved judgments from provisional reviewer suggestions; cite raw source and log uncertainty/overrides. Persist vetted FRs and routine capabilities separately. Do not claim this is model fine-tuning or independently validated science.

Use API budget for a three-way, matched-product **dynamic recommendation experiment**: label/claim baseline, formulation-based, and profile/context-aware. Every engine receives the same available products and user profile; compare incremental value of scientific source evidence and context rather than extra input access.

## Review rules
- Functional roles must be realistically delivered at the product's target zone and coverage under label instructions.
- A shampoo's ordinary cleansing is a routine capability; FR25 requires meaningfully supported buildup/removal function.
- A prewash scalp serum may loosen buildup but requires subsequent shampoo; no stand-alone FR25.
- Oil removal does not imply reduced sebum *production* (FR17).
- Scalp massage instructions do not establish product-specific FR20.
- Humectants in wash-off products do not automatically establish meaningful FR18.
- Oils/waxes in surface finishers are not whole-head detanglers (FR09).
- Anti-frizz alone doesn't substantiate humidity resistance (FR13). Diffusing advice doesn't substantiate intrinsic volume gain (FR27).
- Claim, formulation plausibility, application relevance, independent study evidence, and finished-product performance are distinct levels of evidence. No one can infer complete efficacy from INCI alone.
- Preserve non-FR capabilities, uncertainty and role/format limitations.

## TGIN first-pass reference
A 38-product conservative initial TGIN reference JSON/CSV was prepared locally from the existing raw TGIN scrape: three user-reviewed pilot decisions, 35 provisional ChatGPT-assisted reviews; **not yet independently verified or approved for app use**. The attached downloadable local package is `curlcode_tgin_reference_v01.zip` (not committed to GitHub because it incorporates the scraped product catalog). Verify questionable original subtypes, mask vs packette ingredients, contested heat/growth/repair claims and hair/scalp dual-use applications before approving. No additional API calls were made.

## Validation safeguards
Do not declare AI-generated reference annotations unquestionable truth. Preserve a blind or independent expert-judged validation split, compare recommendations within product categories, add user feedback as available, and don't tune reference labels to maximize model benchmark agreement.

## Next
1. Reviewer approves/corrects TGIN draft (ideally as grouped FR patterns).
2. Clean and source-verify Color Wow, then create the same static review format for Color Wow, Briogeo and Camille Rose.
3. Check category competition and construct 10 profile scenarios.
4. Run dynamic recommender A/B/C experiments with saved user-independent product intelligence.
