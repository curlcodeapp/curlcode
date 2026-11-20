# Camille Rose — 63-product static intake (2026-11-20)

**Status:** first-pass ChatGPT-assisted draft, NOT approved or product-page verified. **No API usage.** Downloadable package: `camille_rose_static_review_v01.zip` generated during the discussion; raw catalog data not committed to GitHub.

## Dataset
Existing user-supplied `curl_code.zip`: `curl_code/data/raw/CamilleRose/camille_rose_products_desc_directions_repaired.json`. **63** records with nonempty name, URL, description, directions and INCI; older `camille_rose_products.json` contains 77 records but several malformed inputs. This 63-record repaired subset does not mean 14 products are discontinued.

Draft catalog: **159 provisional accepted FR labels**, **13 qualified**, **32 records with review flags**. These are counts, not validity or performance measures. The local JSON/CSV preserves product URLs, source hashes, original type, corrected role hypotheses, primary FRs, qualified FRs, and non-FR capabilities. All have `source_page_verified=false`.

## Critical findings
- **Rose Cleansing Milk** wrongly typed `leave_in`: its directions instruct scalp/hair cleansing and thorough rinse.
- **Nangai & Tsubaki Strength Restore Protein Treatment** has an oil-based INCI/directions with no evident protein in supplied list; do not award FR06 on name alone.
- **Rosemary Oil Strengthening Leave-In Conditioner** is typed conditioner but directions show leave-in styling/detangling.
- **Curl Maker**, **Edge Freeze**, **Coconut Water Curl Coating CoWash** typed `other`, despite clearer roles.
- **Black Castor Oil Essence Pure Strengthening Oil** has a water-first INCI; verify formulation or misattachment.
- **Spiked Honey Mousse** and **Mini**, and **Brown Butter Melt** and **Signature Collection**, need version/SKU and INCI reconciliation.
- **The Gro Grease** markets growth/psoriasis/dandruff/eczema; claims are not verified medical efficacy, do not infer scalp microbial FR19.
- **Temp Tamer** heat claim pertains to blow-dry use on supplied directions; FR15 remains qualified, not proof of flat iron thermal protection.
- Shampoos retain `hair_cleansing` capability distinct from FR25; targeted residue-removal claims are reviewed separately.
- Curl-volume preservation via maintained curl geometry is distinct from increasing individual-strand diameter.

## Scientific literature boundaries
Rinse-off conditioners can deposit cationic polymers/surfactants and other agents onto hair, as discussed in https://doi.org/10.3390/cosmetics7020026 and https://pmc.ncbi.nlm.nih.gov/articles/PMC9921463/. Polymer pretreatments can mitigate some flat-iron damage in experimental settings: https://pubmed.ncbi.nlm.nih.gov/21635854/. None proves efficacy of any named finished product or additive benefit from layering multiple protectants.

## Next
Review source/type anomalies and accepted/qualified assignments by role; keep independent scientific evidence as a separate layer. Proceed to Briogeo and four-brand coverage comparison. Preserve dynamic OpenAI API spend for actual user-profile recommendation tests.
