# CurlCode — Product Intelligence Specification (v0.1)

**Status:** Draft; eligibility and inference rules must be tested with real products.  
**Canonical location:** This GitHub file. [High-level architecture](./high-level-architecture.md).

## Aim

Classify the mechanisms each haircare product plausibly supports (FR01–FR29) from raw manufacturer data, product type and formulation evidence. Product classification is separate from dynamic suitability scoring for a particular user.

## Pipeline and script boundaries

1. **Brand-specific website extractors:** One adapter for each brand/domain, each emitting the same raw record.
2. **Ingredient normalization, validation and type inference:** Preserve the ordered INCI list and raw source text; perform two **automated** gates followed by **one** exception-based human review.
3. **Product enrichment:** Calculate FR assignments, ingredient flags, metric estimates and evidence/confidence using versioned rules.

Do not rescrape high-quality existing raw records solely because older enrichment outputs exist.

## Raw data contract

Required extracted fields:
- `name`
- `url`
- `description`
- `directions`
- `ingredients` (ordered array; save unmodified original ingredient text as well)

Store `scraped_at`, `source_domain`, `scraper_version`, raw field content and provenance. Infer `brand` from site/domain context, subject to review. Never silently equate unavailable ingredients with a verified empty list.

## Gate 1 — automated quality assessment

Flag: empty fields; broken URL; duplicate URLs or brand/name combinations; ingredient lists that resemble prose; directions that resemble description/marketing; repeated description/directions; implausible ingredient counts; HTML, menus or footer artifacts; missing provenance. A flag reports `product_id`, `field`, `reason`, `severity`, `source_excerpt`, `suggested_fix`.

Critical failures prevent reliable enrichment; lesser concerns can be flagged for review.

## Gate 2 — automated product typing

Infer `type`, `subtype`, and `form` from name, source product category, claims and directions. Do not infer form from incidental mentions of oils or serums in marketing prose. Flag type/subtype ambiguity and conflicts. Make type and subtype reviewable; correct them **before** FR enrichment.

## Human review

Present Gate 1 and Gate 2 anomalies in **one consolidated queue**. Review only exceptions, plus a periodic sample of auto-approved records. Preserve human corrections as explicit overrides. Re-run affected enrichment whenever raw fields or product type/subtype changes; never overwrite manual fixes with a later scraper run without review.

## FR assignment — evidence-aware

The existing `docs/product/CurlCode_Recommendation_Engine_Tables.xlsx` workbook already includes authoritative **HairMechanisms** definitions and a **ProductCategories** sheet associating categories, FR IDs, support strength and routine stage. Start with that mapping; the table below is **provisional** and must not override the workbook without validation.

1. Extract candidate FRs from `name`, `description`, `directions` manufacturer claims (separate from ingredients).
2. Apply product `type`/`subtype`, target area, and contact-time eligibility. Use the canonical FR *mechanism*, not superficial word overlap.
3. Evaluate ingredients: prioritize high-impact first-five INCI evidence, examine the complete list for relevant active, surfactant, polymer and safety flags. Ingredient order is approximate; concentrations and formula behavior remain unknown.
4. Mark each candidate FR `supported`, `qualified`, `contradicted`, or `unresolved`; contradictions should flag review rather than automatically claim a scientifically proven negation.
5. Retain assigned `fr` array for compatibility, plus separate per-FR evidence: claim-only, product-type-supported, ingredient-supported, ingredient-challenged, reasons, and rules version. Keep rejected candidates for audit.

### Provisional product-category constraints

| Type/category | Typical candidate mechanisms (when supported) | Caution |
|---|---|---|
| Clarifying shampoo | FR25; sometimes FR17 | Do not infer FR12 or FR29 because of film-formers, or FR01 from glycerin alone. FR26 is often a later routine need. |
| Gentle cleanser/co-wash | FR25 when buildup-removal evidence exists; conditioning-related FRs only when credible | Rinse-off limits persistence of styling effects. |
| Rinse-out / deep conditioner | FR01, FR02, FR04, FR06, FR07, FR09, FR10 | Ingredient polymer presence doesn't automatically imply styling hold. |
| Leave-in conditioner | FR01, FR02, FR04, FR09, FR10, FR14 | Hold requires styling evidence rather than a generic film-former. |
| Styler / finisher | FR11–FR16, FR23, FR24, FR27–FR29 as supported | Curl hold (FR12), humidity resistance (FR13), and style longevity (FR29) are distinct. |
| Scalp treatment | FR17–FR19, FR21, FR25 depending on intended purpose | FR20 growth claims require caution; rosemary presence is insufficient. |
| Heat protectant | FR15 when supported | Silicones alone do not prove tested heat protection. |

This matrix is a **test hypothesis**, not a definitive hard-exclusion table. First reconcile the actual ProductCategories rows and use subtype/contact-time distinctions.

## Metric inference and confidence

Retain the existing output keys `weight`, `protein_level`, `hold_level`, `slip_level`, `occlusiveness`, `film_forming`, `humectant_level`. Add per-metric `evidence`, `evidence_confidence` (low/medium/high), `rule_version` and `review_required` metadata without breaking consumers.

**Evidence confidence** means strength of support for an *inference*, NOT measured efficacy. Allow `unknown` when evidence is absent instead of marking `none`. Ingredient position and product contact time are useful heuristics but insufficient to establish exact performance.

| Metric | Useful inputs | Uncertainty |
|---|---|---|
| Protein | Protein/amino-acid identities and list positions | Concentration, molecular weight and effect |
| Weight | Oils, waxes, butters, emollients, form, rinse-off/leave-on | Application amount and final texture |
| Slip | Quaternary conditioners, fatty alcohols, silicones, polymers, conditioner type | Detangling force isn't measured |
| Film-forming | Identified polymers and category | Persistence, buildup and removability unknown |
| Hold | Styler subtype, hold claim, known fixative polymers | Hold strength/humidity performance untested |
| Occlusiveness | Oils, petrolatum, waxes, butters, silicones | Whole-formula behavior uncertain |
| Humectancy | Humectants and approximate positions | Concentration and environment dependent |

## Manual review triggers

Critical missing or garbled ingredients where safety/ingredient-based exclusions rely on them; contradictory product type/subtype; suspicious mis-scraped directions or descriptions; substantial claim-ingredient conflicts; ambiguous medical/scalp efficacy; high-impact classification changes. Review a sample of auto-passed records to evaluate validator recall.

## Known false positives

- `phenoxyethanol` is a **preservative**, not a drying alcohol; do not flag it as such.
- Film-forming ingredients in a scalp exfoliator or clarifying shampoo do **not** automatically confer FR12 (curl hold) or FR29 (style longevity).
- Mentions of protective styles in directions do not automatically imply FR21 (protect fiber under tension).
- Missing ingredients do not prove a product is free of allergens or restricted ingredient groups.

## Dynamic scoring and routines

Prioritize user functional needs from hair, scalp, current hairstyle, goals and environment; select category-appropriate product candidates; apply reliable exclusions and dynamically score suitability. A product matching FR12 does not guarantee it suits straightened 4C hair in humidity. Explain evidence and uncertainty. Routine assembly uses product category, directions, order and frequency; do not mandate clarifying or forbid daily use from film-former presence alone.

## Implementation sequence

1. Inventory existing brand datasets (raw, partially or differently enriched), identify raw fields and enrichment versions when known.
2. Normalize and validate raw datasets; implement Gate 1, Gate 2 and one exception review queue.
3. Compare the official ProductCategories associations to real catalog products; refine eligibility decisions.
4. Modify the enrichment engine to track provenance, category constraints and ingredient contradictions; correct ingredient dictionary errors.
5. Add per-metric evidence/confidence; test three hair contexts: straightened textured hair in humidity, wash-and-go with buildup concerns, and protective styling with scalp needs.

## Ownership and related documents

GitHub is authoritative; Linear issues link here. The frontend UX specification governs interface behavior, not backend classification logic. Refer to [ADR 0001](../decisions/0001-ground-evaluation-engine-in-real-fr-data.md) and the [official FR workbook](../product/CurlCode_Recommendation_Engine_Tables.xlsx) before implementation.
