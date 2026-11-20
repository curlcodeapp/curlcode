# CurlCode formulation × context evidence pilot v0.4 — 2026-11-20

**Status:** Research registry and controlled test designs completed, validated offline; no additional paid API calls. Local downloadable package `curlcode_context_evidence_pilot_v04.zip` includes v0.3 humidity pilot files plus new evidence registry and tests. No product performance or A/B/C superiority claim made.

## Core design
- **Formulation first:** brand and marketing masked for B/C; claims only checked after mechanism ranking.
- **Evidence registry** (`context_evidence_registry.json`): 12 source records annotated for experimental vs observational/review, texture population, supported inference, and explicit **do-not-infer** limitations.
- **Six context modifiers:** relative humidity; hard water; exercise/sweating; wash frequency; heat styling; coily-hair manipulation and grooming.
- **Five new matched scenario designs** (`context_pair_designs.json`): hard vs soft water; regular vs no exercise; 14 vs 3 days between washes; flat iron vs no heat; dry vs wet-sectioned detangling. These are **designs only**, not active API trials; pair-specific role-matched candidate pools and controls need verifying. Note exercise count is a weak proxy for sweat exposure.
- **Texture specificity:** Explicit type-4/coily or African-hair experiments tagged and separated from generic hair-fiber data or survey evidence. Do not generalize one group's results to all curl patterns.
- Offline tests: `python3 test_context_registry.py` and `python3 test_climates.py` pass. No changes to canonical FR definitions or production Supabase records.

## Evidence exemplars
- Hard-water uptake, with oxidative damage/pH interactions: https://pubmed.ncbi.nlm.nih.gov/21982353/
- Hard-water mineral deposit vs uncertain microscopic damage: https://pubmed.ncbi.nlm.nih.gov/28799530/
- Type-4 combing force and repeated-breakage method: https://pmc.ncbi.nlm.nih.gov/articles/PMC13727708/
- Natural African-hair braiding/combing damage: https://pubmed.ncbi.nlm.nih.gov/33605448/
- Textured-hair repeated wash/blow-dry/flat iron: https://www.mdpi.com/2079-9284/12/3/93
- Textured-hair humidity/curl response methods: https://onlinelibrary.wiley.com/doi/full/10.1111/ics.70096
- African-American women, exercise and style management survey (observational; not product efficacy): https://jamanetwork.com/journals/jamadermatology/fullarticle/1485354
- Afro-textured care narrative review: https://pmc.ncbi.nlm.nih.gov/articles/PMC12900221/
- Afro-ethnic and Caucasian comparative heat/chemical assay: https://onlinelibrary.wiley.com/doi/10.1111/jdv.15761

## Interpretation boundaries
- Hard water supports mineral accumulation hypothesis, **not** uniform damage or mandatory chelation for every user.
- Exercise/sweat affects style maintenance/comfort; no compelling brand-specific sweat-resistant gel rankings established.
- Wash intervals and product layering affect scalp and routine goals; no universal wash prescription.
- Direct heat vs airflow, temperature and repeat passes matter; generic polymers or claims do not establish fixed product-specific thermal protection.
- Differences in coily texture, manipulation and braiding matter; ancestry is **not** a reliable substitute for observed fiber traits.

## Next
Keep H01/H02 as first controlled API comparison; add source-grounded, stage-matched candidate pools for new modifiers, record outcome reasoning and whether the model appropriately abstains. Do not reward a winner change by itself; evaluate hidden formulation distinctions and calibrated evidence.
