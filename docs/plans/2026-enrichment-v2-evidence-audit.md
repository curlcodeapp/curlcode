# CurlCode — Enrichment v2: evidence, applicability and source QA

**Status:** Pilot design, 2026-11-19. Supplements [Product Intelligence](../architecture/product-intelligence.md) and [ADR-0003](../decisions/0003-hybrid-ai-mvp.md).

## Motivation
The initial 16-product benchmark (6 TGIN, 10 Color Wow) yielded 44/50 reviewer checks for the AI vs 38/50 for deterministic v0.4. These are **curated agreement checks**, not independent efficacy validation. Do not overwrite or retrospectively rescore those results.

A review of the previously uploaded Color Wow `color_wow_products_step1.json` showed **33/33 descriptions contain a leading product-description JSON string plus extraneous trailing JSON-LD/page metadata**. After extracting the leading string, **16/33** still contain heat/thermal protection language. This does not establish efficacy or independently verify source attribution. Preserve the raw description and independently spot-check consequential claims against the correct product page before accepting enrichment.

## Product enrichment contract
For each candidate FR, distinguish:
- **status:** supported, qualified, unresolved, rejected
- **manufacturer claim:** present/absent and exact source provenance
- **formulation plausibility:** supported, challenged, unknown, with ingredient rationale
- **evidence strength:** low/moderate/high *confidence in inference*, not tested performance
- **independent evidence:** retrieved citation with DOI/URL, applicability and limitations, or explicitly unavailable
- **application suitability:** target zone, coverage, rinse-off/leave-on, dose/contact time, other required routine steps
- **versioning:** source hash, model/prompt version, FR definitions version, manual overrides

Do not promote marketing claims or ingredient presence to demonstrated finished-product performance. External literature retrieval/verification is a separate capability, not yet implemented in the current benchmark.

## FR guardrails from reviewer discussion
- FR09 = fiber lubrication/slip during detangling/styling; FR10 = reduction of fiber-to-fiber friction. A localized wax stick is not a whole-head detangler solely because it contains wax/emollients.
- FR11 requires curl clumping; a generic styling/hold claim is insufficient.
- FR28 requires reducing excess volume, not simply controlling flyaways; remove blanket required FR28 for wax sticks.
- FR25 = **removing** residue. A prewash scalp serum may **loosen** buildup but require a shampoo afterward. Save `precleansing_residue_loosen` capability and `follow_with_shampoo` dependency, not independent complete FR25.
- FR06 protein evidence supports plausible conditioning but does not itself demonstrate internal keratin structural repair.
- FR15 heat-protection claims are not validation. Review the correct source page and finished-formula evidence before considering it verified.
- FR29 style longevity must be independently justified; do not infer from shine or generic styling alone.

## Next milestones
1. Audit and repair Color Wow field-level extraction; quarantine malformed or unattributed records, sample original page claims.
2. Freeze reviewer-approved benchmark v2 and rerun with **clean inputs**; inspect unsupported positive FRs, repeatability and cost.
3. Enrich TGIN and Color Wow as versioned stable catalog assessments, with exception review.
4. Normalize Briogeo and Camille Rose datasets; ensure category competition within the four-brand pool.
5. Evaluate 10 profiles using identical products and user contexts across label-only, formulation-aware and full context-aware engines, blinded where possible.

**Success criterion:** Demonstrate improved user-product suitability and evidence grounding vs label-only—not simply a higher FR-match percentage.
