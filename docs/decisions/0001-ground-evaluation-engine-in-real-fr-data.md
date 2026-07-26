# 0001: Ground the evaluation engine in real FR data using per-step "core FR" selection

## Status

Accepted

## Context

The SDS repeatedly calls the FR01–FR29 table "authoritative" and requires it as versioned
configuration (§9, §30, Appendix B), but never provided the actual definitions — flagged as an
open input (§32) since the M1 planning session. The product owner has now supplied it as
`docs/product/CurlCode_Recommendation_Engine_Tables.xlsx`, which turned out to be far richer
than a flat FR list. It contains five related sheets:

- **HairMechanisms** — the real FR01–FR29 definitions (mechanism, UX label, target area,
  description, implementation notes).
- **StyleMechanisms** — which FRs matter for a given hairstyle (wash-and-go, twist-out, silk
  press, etc.) and how much, as a 0–10 base weight with a Core/Support/Conditional requirement
  type.
- **InputModifiers** — how HairProfile answers (porosity, strand thickness, scalp condition,
  concerns, environment, lifestyle, goals) shift those base weights by -5 to +5.
- **ConflictRules** — how to resolve competing needs (e.g., fine strands + high porosity implies
  moisture without heaviness; maximum volume directly conflicts with a sleek finish).
- **ProductCategories** — which product categories support which FRs, at what strength (1–5),
  and during which routine stage (Cleanse, Condition, Treat, Style, Finish, etc.).

This is a complete style-weighted, profile-personalized, conflict-resolved scoring model — the
real design behind SDS §17's recommendation engine. It does not map cleanly onto this MVP's
current evaluation engine (`src/features/evaluation/scoring.ts`), which scores a product against
a step by simply averaging coverage across every FR whose `applicableStepTypes` includes that
step's type.

We considered three options: (1) ground the current simple engine in the real FR data only, (2)
build the full weighted/personalized/conflict-resolved engine now, or (3) just store the real
tables as reference without any code changes. Given this project's standing discipline of
keeping milestones small and not building ahead of the current one (see `CLAUDE.md`), we chose
(1) — this ADR records what that grounding actually required and where it falls short of the
real design.

## Decision

**FR definitions.** Moved from `src/lib/mock-data/fr-definitions.ts` (an illustrative, invented
placeholder subset) to `src/config/fr-definitions.ts` (real, versioned configuration per SDS
§43) — a direct transcription of the HairMechanisms sheet. This is a real architectural
distinction, not just a file move: `mock-data/` is for data explicitly known to be fake or
placeholder; `config/` is for data that is real but externally authored and versioned,
independent of application code changes.

**Step-type applicability.** The source sheet has no step-type dimension — FRs relate to
hairstyles (StyleMechanisms) and product categories (ProductCategories), not routine steps
directly. We derived `applicableStepTypes` per FR from ProductCategories' `(Routine_Stage,
FR_ID)` pairs, but deliberately did **not** aggregate every category association into a step's
requirement list. For example, the "Style" stage alone touches 7 FRs (curl definition, hold,
humidity resistance, tension protection, alignment, volume, smoothing) — several of which
directly conflict per ConflictRules (CR04: max volume vs. definition; CR05: max volume vs. sleek
finish). Averaging a product's fit across all 7 would make it impossible for _any_ product to
score well on a "define" step, since no single product reasonably serves conflicting goals.
Instead, each step lists only the 1–2 FRs most centrally defining its purpose (e.g. `define` →
FR11 Curl Definition, FR12 Curl Hold). This mirrors the _simplicity_ of the placeholder subset it
replaces, just with correct real IDs and meanings instead of invented ones.

FRs with no real product-category evidence, or whose only evidence maps to a routine stage we
don't have a step type for yet (Scalp Care, Scalp Treatment, Protect, Maintain), get an empty
`applicableStepTypes` — they're real mechanisms this simplified engine can't act on yet, not
mechanisms we're claiming don't matter.

**Product catalog.** Every mock product's `frCoverage` was remapped from the old placeholder FR
numbers (which meant something different — e.g. old FR01 was "cleanses without stripping", real
FR01 is "Increase Fiber Water Content") to real FR IDs, using each product's closest real
`Product_Category` and that category's `Support_Strength` (1–5, scaled to 0–100 as
`strength * 20`) as the score. This is still not ingredient-derived enrichment (SDS §6/§8/§9's
scrape → normalize → enrich pipeline isn't implemented) — it's a category-based approximation,
one step more grounded than the previous fully-invented numbers.

## Consequences

- The demo routine's evaluation results changed from an artificially uniform "everything is
  good_fit except one contrived poor fit" to a more realistic, varied spread (excellent/good/
  weak/acceptable) — actually a better demonstration of the score bands, not a regression.
- Two steps in the seed routine (`leave_in`, `define`) now genuinely score `weak_fit` because
  their assigned products cover only one of the step's two core FRs. This is real evidence-based
  output, not a fabricated demo scenario — see comments in `src/lib/mock-data/routines.ts`.
- The deferred, full weighted engine (StyleMechanisms base weights + InputModifiers
  personalization + ConflictRules resolution) remains a separate, larger future milestone. When
  it's built, `evaluateProductForStep`'s flat averaging is expected to be replaced entirely, not
  extended — the "core FR per step" simplification in this ADR is intentionally throwaway
  scaffolding for the interim, not a foundation to build the weighted model on top of.
- `CLAUDE.md`'s "SDS traceability" section is updated to reflect that the FR table itself is no
  longer a placeholder, while the weighted personalization model remains unbuilt.
