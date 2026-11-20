# CurlCode six-brand matched recommendation pilot — inputs prepared 2026-11-20

**Status:** Six-brand normalized test inventory, 10 synthetic profiles, and candidate sets built offline; **no API recommendation comparisons have yet been executed** and catalog is **not production approved**. See downloadable conversation artifact `curlcode_recommendation_pilot_v01.zip`.

## Deliverables
- **195 records** from TGIN (38), Color Wow (33), Camille Rose (63), Briogeo (47), PATTERN (7), Redken (7), retaining source URLs, ingredients, existing FR review status, qualified labels and QA flags.
- **32 preliminary comparison candidates** in 7 functional discovery groups (cleansing, conditioning, curl styling, detangling, heat styling, volume and repair). Group membership does not establish same routine step or substitutability.
- **10 synthetic hair/usage profiles**, including humid flat-ironed hair, fine curls seeking volume, scalp protection, hard water, and chemically damaged hair.
- Test protocol: label-only vs formulation-aware vs full contextual reasoner, same catalog, same profile, same product-ID validity requirements, source-grounded evaluation and blind scoring.

## Immediate blockers before paid API run
- De-duplicate same-formula packaging variants and check source-field integrity on actual shortlists.
- Enforce routine-stage equivalence (detangler vs co-wash; rinse-out vs leave-in; blow-dry primer vs flat-iron heat protectant).
- PATTERN/Redken published full ingredient lists were collected but normalized comparison records still lack extracted manufacturer descriptions/directions; fill these before a fair label-only baseline.
- Briogeo and Camille Rose proposed FRs and some role/source conflicts remain unapproved; do not treat draft labels as demonstrated finished-product efficacy.
- Scientific citations relate to general mechanisms, not automatically particular product performance.

## FR06, FR15 evidence policy
- **FR06:** meaningful keratin/fiber structural reinforcement can be supported by relevant chemistry and mechanical testing; formation of new covalent bridges should not be described as literal restoration of original cystine disulfide bonds without appropriate direct bond evidence. Tensile strength and elastic modulus are not percentages of bonds repaired.
- **FR15:** equivalent experimental literature for actual protective polymer systems, plus plausible formula and application context, may support acceptance with uncertainty. Do not require finished-product trials universally; do not promote any heat claim to independently verified efficacy just because it is marketed for 230 °C.
- A product-specific controlled test strengthens performance confidence but is not a general prerequisite for a mechanism-level recommendation.
- Relevant peer-reviewed background: https://pubmed.ncbi.nlm.nih.gov/38733167/ ; https://onlinelibrary.wiley.com/doi/full/10.1111/ics.12944 ; https://www.mdpi.com/2079-9284/11/5/150 ; https://pubmed.ncbi.nlm.nih.gov/21635854/ ; https://pubmed.ncbi.nlm.nih.gov/39757966/ .

## Next engineering steps
1. Finish shortlists and exact description/directions source fields; freeze test pool and acceptance/qualified metadata.
2. Implement API evaluation adapter with three controlled prompt variants and strict response schema; retain token/price measurements.
3. Conduct small blinded pilot and inspect false positives, unsupportable claims, and no-evidence decisions before scaling.
