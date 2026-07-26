import type { Product } from '@/types/domain';

// Seed catalog standing in for the scrape/normalize/enrich pipeline (SDS §6, §8, §9).
// frCoverage now uses the real FR01-FR29 IDs (src/config/fr-definitions.ts), scored from the
// real ProductCategories sheet's Support_Strength (1-5, scaled to 0-100 as strength*20) for
// each product's closest real product category — not derived from actual ingredient parsing,
// which the enrichment pipeline this MVP doesn't implement would normally produce.
export const mockProducts: Product[] = [
  {
    id: 'prod_mielle_rosemary_shampoo',
    name: 'Rosemary Mint Strengthening Shampoo',
    brand: 'Mielle Organics',
    type: 'shampoo',
    ingredients: ['water', 'rosemary leaf extract', 'biotin', 'mild surfactants'],
    // gentle_shampoo: FR17 (Balance Scalp Oil Production), strength 4
    frCoverage: [{ frId: 'FR17', score: 80 }],
  },
  {
    id: 'prod_mielle_pomegranate_leave_in',
    name: 'Pomegranate & Honey Leave-In Conditioner',
    brand: 'Mielle Organics',
    type: 'leave_in',
    ingredients: ['water', 'pomegranate extract', 'honey', 'glycerin', 'panthenol'],
    // leave_in_spray: FR01 (Increase Fiber Water Content), strength 4
    frCoverage: [{ frId: 'FR01', score: 80 }],
  },
  {
    id: 'prod_mielle_babassu_conditioner',
    name: 'Babassu Oil & Mint Deep Conditioner',
    brand: 'Mielle Organics',
    type: 'deep_conditioner',
    ingredients: ['water', 'babassu oil', 'peppermint oil', 'shea butter'],
    // deep_conditioner: FR02 (Reduce Fiber Water Loss), strength 5
    frCoverage: [{ frId: 'FR02', score: 100 }],
  },
  {
    id: 'prod_auntjackies_curl_custard',
    name: 'Curl La La Defining Curl Custard',
    brand: "Aunt Jackie's",
    type: 'styler',
    ingredients: ['water', 'flaxseed extract', 'aloe vera', 'castor oil'],
    // curl_cream: FR11 (Improve Curl Clumping), strength 4
    frCoverage: [{ frId: 'FR11', score: 80 }],
  },
  {
    id: 'prod_auntjackies_quench_moisturizer',
    name: 'Quench Moisturizing Hair Butter Creme',
    brand: "Aunt Jackie's",
    type: 'styler',
    ingredients: ['water', 'shea butter', 'coconut oil', 'aloe vera juice'],
    // leave_in_cream: FR02 (Reduce Fiber Water Loss), strength 4
    frCoverage: [{ frId: 'FR02', score: 80 }],
  },
  {
    id: 'prod_auntjackies_flaxseed_gel',
    name: 'Flaxseed Recipes Extra Hold Gel',
    brand: "Aunt Jackie's",
    type: 'styler',
    ingredients: ['water', 'flaxseed extract', 'carbomer', 'aloe vera'],
    // gel_strong_hold: FR12 (Increase Curl Hold) strength 5, FR13 (Reduce Humidity Absorption) strength 4
    frCoverage: [
      { frId: 'FR12', score: 100 },
      { frId: 'FR13', score: 80 },
    ],
  },
  {
    id: 'prod_sheamoisture_manuka_masque',
    name: 'Manuka Honey & Yogurt Hydration Hair Masque',
    brand: 'SheaMoisture',
    type: 'deep_conditioner',
    ingredients: ['water', 'manuka honey', 'yogurt extract', 'shea butter'],
    // deep_conditioner: FR02 (Reduce Fiber Water Loss), strength 5
    frCoverage: [{ frId: 'FR02', score: 100 }],
  },
  {
    id: 'prod_sheamoisture_coconut_shampoo',
    name: 'Coconut & Hibiscus Curl & Shine Shampoo',
    brand: 'SheaMoisture',
    type: 'shampoo',
    ingredients: ['water', 'coconut oil', 'hibiscus flower extract', 'mild surfactants'],
    // gentle_shampoo: FR17 (Balance Scalp Oil Production), strength 4
    frCoverage: [{ frId: 'FR17', score: 80 }],
  },
  {
    id: 'prod_sheamoisture_jbco_leave_in',
    name: 'Jamaican Black Castor Oil Strengthen & Restore Leave-In',
    brand: 'SheaMoisture',
    type: 'leave_in',
    ingredients: ['water', 'jamaican black castor oil', 'apple cider vinegar', 'shea butter'],
    // leave_in_spray: FR01 (Increase Fiber Water Content), strength 4
    frCoverage: [{ frId: 'FR01', score: 80 }],
  },
  {
    id: 'prod_thedoux_foam_wrap',
    name: 'Foam Wrap Setting Foam',
    brand: 'The Doux',
    type: 'styler',
    ingredients: ['water', 'polymer blend', 'panthenol', 'aloe vera'],
    // mousse: FR11 (Improve Curl Clumping) strength 4, FR27 (Increase Fiber Volume) strength 5
    frCoverage: [
      { frId: 'FR11', score: 80 },
      { frId: 'FR27', score: 100 },
    ],
  },
  {
    id: 'prod_thedoux_texture_foam',
    name: 'Def Texture Foam Mousse',
    brand: 'The Doux',
    type: 'styler',
    ingredients: ['water', 'polymer blend', 'shea butter', 'glycerin'],
    // mousse: FR11 (Improve Curl Clumping) strength 4, FR27 (Increase Fiber Volume) strength 5.
    // Notably missing FR12 (Curl Hold), the "define" step's other required FR — a real,
    // evidence-based weak fit for that step, not a fabricated one (see routines.ts).
    frCoverage: [
      { frId: 'FR11', score: 80 },
      { frId: 'FR27', score: 100 },
    ],
  },
  {
    id: 'prod_thedoux_hydration_oil',
    name: 'Big Detangler Hydrating Detangling Oil',
    brand: 'The Doux',
    type: 'oil',
    ingredients: ['sweet almond oil', 'jojoba oil', 'vitamin e'],
    // detangler: FR09 (Increase Fiber Lubrication / Slip), strength 5
    frCoverage: [{ frId: 'FR09', score: 100 }],
  },
  {
    id: 'prod_keracare_thermal_wonder',
    name: 'Thermal Wonder Heat Protectant',
    brand: 'KeraCare',
    type: 'heat_protectant',
    ingredients: ['water', 'dimethicone', 'cyclopentasiloxane', 'panthenol'],
    // heat_protectant: FR15 (Protect From Heat Damage), strength 5
    frCoverage: [{ frId: 'FR15', score: 100 }],
  },
  {
    id: 'prod_keracare_detangling_shampoo',
    name: 'Detangling Shampoo',
    brand: 'KeraCare',
    type: 'shampoo',
    ingredients: ['water', 'mild surfactants', 'panthenol', 'chamomile extract'],
    // gentle_shampoo: FR17 (Balance Scalp Oil Production), strength 4
    frCoverage: [{ frId: 'FR17', score: 80 }],
  },
  {
    id: 'prod_keracare_leave_in',
    name: 'Leave-In Conditioner',
    brand: 'KeraCare',
    type: 'leave_in',
    ingredients: ['water', 'hydrolyzed protein', 'glycerin', 'panthenol'],
    // leave_in_spray: FR01 (Increase Fiber Water Content), strength 4
    frCoverage: [{ frId: 'FR01', score: 80 }],
  },
  {
    id: 'prod_keracare_natural_oil_moist',
    name: 'Natural Textures Nourishing Oil Moisturizer',
    brand: 'KeraCare',
    type: 'oil',
    ingredients: ['water', 'coconut oil', 'olive oil', 'shea butter'],
    // lightweight_oil: FR10 (Reduce Fiber Friction), strength 3
    frCoverage: [{ frId: 'FR10', score: 60 }],
  },
  {
    id: 'prod_mielle_pomegranate_pre_poo',
    name: 'Pomegranate & Honey Pre-Shampoo Treatment',
    brand: 'Mielle Organics',
    type: 'oil',
    ingredients: ['water', 'pomegranate extract', 'honey', 'castor oil'],
    // penetrating_treatment: FR03 (Improve Water Penetration), strength 5
    frCoverage: [{ frId: 'FR03', score: 100 }],
  },
  {
    id: 'prod_auntjackies_protein_treatment',
    name: "Don't Shrink Protein Strengthening Treatment",
    brand: "Aunt Jackie's",
    type: 'protein_treatment',
    ingredients: ['water', 'hydrolyzed wheat protein', 'hydrolyzed silk protein'],
    // protein_treatment: FR06 (Reinforce Keratin Structure), strength 5
    frCoverage: [{ frId: 'FR06', score: 100 }],
  },
  {
    id: 'prod_thedoux_curl_refresher',
    name: 'So Clean Curl Refresher Spray',
    brand: 'The Doux',
    type: 'styler',
    ingredients: ['water', 'aloe vera juice', 'glycerin', 'slippery elm'],
    // refresh_spray: FR29 (Improve Style Longevity), strength 3
    frCoverage: [{ frId: 'FR29', score: 60 }],
  },
];

export function getProductById(productId: string): Product | undefined {
  return mockProducts.find((product) => product.id === productId);
}
