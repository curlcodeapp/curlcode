# Briogeo INCI resolution + PATTERN/Redken curated intake v0.2 (2026-11-20)

**Status:** Source-backed updates for two Briogeo ingredient fields; other records remain intake/provisional. **No OpenAI API calls** or production catalog import performed. Download package: `curlcode_briogeo_pattern_redken_v02.zip` supplied in conversation; large scraped records not committed to GitHub.

## Briogeo
From 48 original rows, excluded the cookie-consent artifact leaving 47 product rows. Three real products had no ingredient lists:
- **Scalp Revival Dandruff Relief Shampoo**: manufacturer's [official page](https://www.briogeohair.com/products/scalp-revival-dandruff-relief-shampoo) lists **3.0% salicylic acid as medicated active**, plus full inactive INCI. Recovered both separately; don't confuse medicated active with the inactive list.
- **Scalp Revival Dandruff Relief Conditioner**: [official page](https://www.briogeohair.com/products/scalp-revival-dandruff-relief-conditioner) lists **1.8% salicylic acid as medicated active** plus full inactive INCI. Recovered separately. Scalp conditioning and anti-dandruff functions need their own evidence and use constraints.
- **Don't Despair, Repair! Vanilla Birthday Cake Deep Conditioning Mask**: [official page](https://www.briogeohair.com/products/dont-despair-repair-vanilla-birthday-cake-deep-conditioning-mask) identifies it as a variant, but full exact INCI not accessible in published page text. **Remain unresolved**; do not substitute standard mask ingredients, especially with possible formula revisions.

## New brand curated product records
- **PATTERN Beauty**: seven products with exact official URLs (Curl Gel, Styling Cream, Leave-In Conditioner, Hydration Shampoo, Strong Hold Gel, Breakage Barrier Mask, Repair360 Leave-In Foam). Four verified published INCI lists transcribed to structured catalog: Curl Gel, Styling Cream, Leave-In Conditioner, Strong Hold Gel. Three incomplete.
- **Redken**: seven selected official product or collection targets (All Soft Shampoo/Conditioner, Acidic Bonding Concentrate Conditioner/Leave-In/5-Min Mask, Volume Injection Shampoo/Conditioner). Product entries staged but full, variant-specific INCI not transcribed; **no final FR assignments**.

## Formulation quality is not one scalar
Same FR set does not imply same suitability: capture conditioning/film/surfactant/emollient systems, weight, slip, hold, contact time, deposition, scent/sensitivity and evidence. Ingredient popularity, expense or natural/synthetic origin does not constitute proof of higher quality or better performance. Unknown concentration and finished-formula efficacy must remain explicit. Preserve manufacturer claim vs evidence provenance.

## Next gate
Resolve the three remaining PATTERN INCI fields, Redken full lists from exact variant pages (or reliable manufacturer published labels), and Briogeo birthday variant as possible. Apply the same static-reviewed FR workflow; only then use the six-brand pool for cross-brand recommendation testing.
