# CurlCode value-brand formulation challenger v0.5 — 2026-11-20

**Status:** Cantu and Pantene product intake and controlled A/B/C pilot runner created locally, offline tests PASS; **no new paid OpenAI API comparison executed** and no production catalog/Supabase updates. Download `curlcode_value_challenger_v05.zip` from conversation for complete source records, test runner and scoring rubric.

## Added nine value-brand test records
**Cantu (4):**
- Ultra Moisture Nourishing Shampoo — https://www.cantubeauty.com/products/ultra-moisture/13oz-ultra-moist-creamy-shampoo/
- Ultra Moisture Nourishing Leave-In Conditioner — https://www.cantubeauty.com/products/ultra-moisture/8oz-ultra-moist-leave-in/
- Ultra Moisture Nourishing Curl Cream — https://www.cantubeauty.com/products/ultra-moisture/10oz-ultra-moist-curl-cream/
- Weightless Protect + Shine Gloss — https://www.cantubeauty.com/products/weightless/weightless-protect-shine-gloss/

**Pantene (5):**
- Gold Series Leave-On Detangling Milk — https://pantene.com/en-us/product/leave-on-detangling-milk
- Gold Series Curl Defining Pudding — https://pantene.com/en-us/product/curl-defining-pudding
- Gold Series Moisture Boost Conditioner — https://pantene.com/en-us/product/moisture-boost-conditioner
- Gold Series Hydrating Butter-Crème — https://pantene.com/en-us/product/hydrating-butter-creme
- Gold Series Moisture Boost Shampoo — https://pantene.com/en-us/products/moisture-boost-shampoo

Manufacturer-published ingredients stored with source URL, timestamp, role, and raw full INCI. Pantene shampoo INCI from indexed official manufacturer source with direct page accessibility issues; verify packaging. Some other label directions incomplete. **No price per 100mL verified**, so value ranking remains a hypothesis pending regional prices. No accepted FRs asserted for new records yet.

## Key comparative findings
- Pantene detangling milk includes dimethicone, stearamidopropyl dimethylamine and quaternium-18 near the top. Cantu Ultra Moisture Leave-In instead emphasizes fatty alcohol, glycerin, castor oil, behentrimonium methosulfate and related conditioners. Both have credible slip/conditioning systems; comparative efficacy is **not proven**.
- Cantu Ultra Moisture Shampoo contains sodium C14-16 olefin sulfonate, **not** an alkyl sulfate surfactant; Pantene Moisture Boost Shampoo lists SLES/SLS. Neither is automatically poor quality, but a user's explicit avoidance of sulfates should apply based on ingredient identity.
- Pantene Curl Defining Pudding has VA/Crotonates copolymer and dimethicone; Cantu curl cream has a different oil/fatty-alcohol/emulsion and hydrolyzed wheat protein/PVP crosspolymer system. The formulas differ; finished hold/humidity superiority remains unknown.
- Cantu Weightless Gloss is silicone-led and marketed for heat protection, but evidence of product-specific heat efficacy is not established; no FR15 accepted automatically.

## Ready-to-test controls
Seven scenarios V01–V07 (leave-in conditioning, curl definition, shampoo, heat styling, silicone exclusion, sulfate exclusion, richness tradeoff). 25-record subset (16 preexisting + 9 new). Offline test passed 7 trials × 3 modes = 21 payloads. A = manufacturer label, B = brand-blind formula/generic task, C = brand-blind formula + user context. C exact exclusion flags deterministic, and failures are validated after model output. Supports tie and insufficient evidence. Cost is not exposed to blinded model as price data is missing.

**Run on Mac** after unzipping:
`python3 test_value.py`
`python3 compare_value.py --trial V01 --modes B,C`
**Paid** only if explicitly intended: `python3 compare_value.py --trial V01 --modes B,C --model gpt-5.4-mini --run`.

## MVP guardrails
- Explicit user exclusions gate out verified ingredient matches; manufacturer reputation, cheapness, silicones/sulfates in general are not automatic negative judgments.
- A user-reported problem alone doesn't establish ingredient causal harm.
- Eligibility independent of sponsorship; disclosed promotion only among suitable products.
- Source evidence ≠ finished-product test.
- This local pilot does not replace canonical FR IDs or the larger six-brand catalog.
