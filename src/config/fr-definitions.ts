import type { FRDefinition } from '@/types/domain';

// The authoritative FR01-FR29 table (SDS §9), sourced from
// docs/product/CurlCode_Recommendation_Engine_Tables.xlsx ("HairMechanisms" sheet).
// This is real, versioned configuration (SDS §43) — not mock data.
//
// `applicableStepTypes` is NOT in the source sheet. It's derived here from the same
// workbook's "ProductCategories" sheet, which maps each FR to the product categories and
// Routine_Stage that support it. Rather than aggregate every category association per step
// (which would require e.g. the "define" step to average across 7 loosely-related FRs —
// several of which actively conflict per the "ConflictRules" sheet, like maximum volume vs.
// sleek/reduced volume), each step lists only the 1-2 FRs most centrally defining its purpose.
// The full weighted model (StyleMechanisms base weights + InputModifiers personalization +
// ConflictRules resolution) is a deferred, separate milestone — see CLAUDE.md.
//
// FRs with no applicable step type below (FR04, FR05, FR07, FR08, FR16, FR18-23, FR26-28)
// are real mechanisms our simplified step-based routine model can't act on yet — most need a
// step type we haven't added (e.g. scalp_treatment, protect_overnight) or are style-preference
// trade-offs excluded per ConflictRules rather than genuinely unrepresentable.
export const frDefinitions: FRDefinition[] = [
  {
    frId: 'FR01',
    mechanism: 'Increase Fiber Water Content',
    uxLabel: 'Hydration',
    targetArea: 'Hair Fiber',
    description: 'Increase the water available within the hair fiber.',
    implementationNotes: 'Prefer lightweight hydration when weight or oiliness is a concern.',
    applicableStepTypes: ['leave_in'],
  },
  {
    frId: 'FR02',
    mechanism: 'Reduce Fiber Water Loss',
    uxLabel: 'Deep Moisture',
    targetArea: 'Hair Fiber',
    description: 'Help the fiber retain water between wash and styling steps.',
    implementationNotes:
      'This is a retention need, not automatically a recommendation for heavy oils or butters.',
    applicableStepTypes: ['deep_condition', 'leave_in'],
  },
  {
    frId: 'FR03',
    mechanism: 'Improve Water Penetration',
    uxLabel: 'Moisture Infusion',
    targetArea: 'Hair Fiber',
    description: 'Help water and conditioning agents reach resistant fibers.',
    implementationNotes:
      'Low-porosity routines may favor lightweight formulas, time, warmth, and thorough rinsing.',
    applicableStepTypes: ['pre_poo'],
  },
  {
    frId: 'FR04',
    mechanism: 'Smooth Cuticle Surface',
    uxLabel: 'Smoothness',
    targetArea: 'Hair Fiber',
    description: 'Reduce surface roughness and improve manageability.',
    implementationNotes: 'Can compete with maximum-volume goals if the formula is heavy.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR05',
    mechanism: 'Increase Fiber Elasticity',
    uxLabel: 'Elasticity Support',
    targetArea: 'Hair Fiber',
    description: "Support the fiber's ability to stretch and recover without snapping.",
    implementationNotes:
      'Hair-health mechanism; normally outranks purely cosmetic goals when breakage is present.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR06',
    mechanism: 'Reinforce Keratin Structure',
    uxLabel: 'Strengthening',
    targetArea: 'Hair Fiber',
    description: 'Temporarily support weakened or chemically altered fiber structure.',
    implementationNotes:
      'Avoid assuming every damaged-hair user benefits from frequent protein use.',
    applicableStepTypes: ['protein_treatment'],
  },
  {
    frId: 'FR07',
    mechanism: 'Repair Cuticle Damage',
    uxLabel: 'Fiber Repair',
    targetArea: 'Hair Fiber',
    description: 'Temporarily improve the feel and protection of damaged cuticle areas.',
    implementationNotes: 'Prioritize for confirmed heat or chemical damage.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR08',
    mechanism: 'Reduce Mechanical Breakage',
    uxLabel: 'Anti-Breakage',
    targetArea: 'Hair Fiber',
    description: 'Reduce breakage caused by detangling, friction, handling, or tension.',
    implementationNotes: 'Often implemented through technique and tools, not only products.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR09',
    mechanism: 'Increase Fiber Lubrication',
    uxLabel: 'Slip / Detangling',
    targetArea: 'Styling',
    description: 'Reduce resistance between fibers during detangling and styling.',
    implementationNotes: 'Use lighter slip systems for fine hair or buildup-prone users.',
    applicableStepTypes: ['detangle', 'condition'],
  },
  {
    frId: 'FR10',
    mechanism: 'Reduce Fiber Friction',
    uxLabel: 'Softness',
    targetArea: 'Hair Fiber',
    description: 'Reduce fiber-to-fiber friction that contributes to tangling and rough feel.',
    implementationNotes:
      'May be delivered through conditioning, nighttime protection, or styling technique.',
    applicableStepTypes: ['seal'],
  },
  {
    frId: 'FR11',
    mechanism: 'Improve Curl Clumping',
    uxLabel: 'Curl Definition',
    targetArea: 'Hair Fiber',
    description: 'Encourage fibers to group into defined curl or coil sections.',
    implementationNotes: 'May conflict with maximum-volume preferences.',
    applicableStepTypes: ['define'],
  },
  {
    frId: 'FR12',
    mechanism: 'Increase Curl Hold',
    uxLabel: 'Curl Hold',
    targetArea: 'Styling',
    description: 'Help a curl pattern or set retain its shape.',
    implementationNotes:
      'High-hold products can increase buildup or stiffness; balance with cleansing and user preference.',
    applicableStepTypes: ['define'],
  },
  {
    frId: 'FR13',
    mechanism: 'Reduce Humidity Absorption',
    uxLabel: 'Humidity Resistance',
    targetArea: 'Styling',
    description: 'Reduce rapid moisture uptake that can disturb a finished style.',
    implementationNotes:
      'Often implemented through film-forming and humidity-resistant styling systems.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR14',
    mechanism: 'Reduce Frizz Formation',
    uxLabel: 'Anti-Frizz',
    targetArea: 'Styling',
    description:
      'Reduce visible frizz caused by roughness, humidity, friction, or styling technique.',
    implementationNotes:
      'Resolve by identifying the dominant cause rather than recommending one universal product type.',
    applicableStepTypes: ['seal'],
  },
  {
    frId: 'FR15',
    mechanism: 'Protect From Heat Damage',
    uxLabel: 'Heat Protection',
    targetArea: 'Styling',
    description: 'Reduce damage risk during diffusing, blow-drying, pressing, or other heat use.',
    implementationNotes:
      'Mandatory candidate whenever direct heat is used; also include temperature and frequency guidance.',
    applicableStepTypes: ['heat_protect'],
  },
  {
    frId: 'FR16',
    mechanism: 'Protect From UV Damage',
    uxLabel: 'UV Protection',
    targetArea: 'Styling',
    description: 'Reduce exposure-related degradation during high or prolonged UV conditions.',
    implementationNotes: 'May be seasonal or environment-driven.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR17',
    mechanism: 'Balance Scalp Oil Production',
    uxLabel: 'Sebum Control',
    targetArea: 'Scalp',
    description: 'Manage excess scalp oil without unnecessarily drying the hair lengths.',
    implementationNotes: 'Always separate scalp recommendations from hair-fiber recommendations.',
    applicableStepTypes: ['cleanse'],
  },
  {
    frId: 'FR18',
    mechanism: 'Increase Scalp Hydration',
    uxLabel: 'Scalp Hydration',
    targetArea: 'Scalp',
    description: 'Improve comfort and hydration of a dry scalp.',
    implementationNotes: 'Do not infer dry scalp from dry hair; treat as separate user inputs.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR19',
    mechanism: 'Control Scalp Microbial Overgrowth',
    uxLabel: 'Flake Reduction',
    targetArea: 'Scalp',
    description: 'Address flaking patterns associated with scalp microbial imbalance.',
    implementationNotes:
      'Escalate persistent, painful, inflamed, or severe symptoms to professional care.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR20',
    mechanism: 'Stimulate Scalp Circulation',
    uxLabel: 'Growth Support',
    targetArea: 'Scalp',
    description: 'Support a scalp-care routine associated with massage and circulation.',
    implementationNotes: 'Avoid promising hair growth; shedding can require medical evaluation.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR21',
    mechanism: 'Protect Fiber Under Tension',
    uxLabel: 'Protective Style Support',
    targetArea: 'Styling',
    description:
      'Reduce tension, friction, and dryness risks during braids, twists, extensions, or similar styles.',
    implementationNotes:
      'Include installation tension, duration, takedown, and scalp access—not just product suggestions.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR22',
    mechanism: 'Reduce Fiber Swelling',
    uxLabel: 'Humidity Control',
    targetArea: 'Hair Fiber',
    description: 'Reduce repeated swelling and contraction in moisture-variable conditions.',
    implementationNotes:
      'Related to FR13 but focused on the fiber rather than only finished-style appearance.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR23',
    mechanism: 'Improve Fiber Alignment',
    uxLabel: 'Smoothness / Shine',
    targetArea: 'Hair Fiber',
    description: 'Encourage a more aligned surface for sleekness and reflectivity.',
    implementationNotes: 'Can reduce perceived volume.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR24',
    mechanism: 'Increase Light Reflection',
    uxLabel: 'Shine',
    targetArea: 'Hair Fiber',
    description:
      'Increase visible shine through smoother surfaces or lightweight finishing products.',
    implementationNotes: 'Avoid oily-looking finishes for fine hair or oily-scalp users.',
    applicableStepTypes: ['seal'],
  },
  {
    frId: 'FR25',
    mechanism: 'Remove Product Buildup',
    uxLabel: 'Clarifying',
    targetArea: 'Cleansing',
    description: 'Remove accumulated styling films, oils, minerals, or residue.',
    implementationNotes:
      'Should trigger a context-specific reconditioning step rather than automatic heavy moisture.',
    applicableStepTypes: ['clarify'],
  },
  {
    frId: 'FR26',
    mechanism: 'Restore Fiber Hydration',
    uxLabel: 'Rehydration',
    targetArea: 'Hair Fiber',
    description: 'Restore conditioning and hydration after a clarifying or stripping event.',
    implementationNotes: 'Dependent mechanism commonly paired with FR25.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR27',
    mechanism: 'Increase Fiber Volume',
    uxLabel: 'Volume',
    targetArea: 'Styling',
    description: 'Increase visible fullness, lift, or expansion.',
    implementationNotes:
      'Often conflicts with heavy conditioning, smoothing, and maximum definition.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR28',
    mechanism: 'Reduce Excess Fiber Volume',
    uxLabel: 'Smoothing',
    targetArea: 'Styling',
    description: 'Reduce expansion or bulk for sleeker styles.',
    implementationNotes: 'Directly conflicts with maximum-volume goals.',
    applicableStepTypes: [],
  },
  {
    frId: 'FR29',
    mechanism: 'Improve Style Longevity',
    uxLabel: 'Style Longevity',
    targetArea: 'Styling',
    description: "Help the selected style remain acceptable for the user's desired duration.",
    implementationNotes:
      'Treat as a composite objective built from hold, humidity resistance, nighttime protection, refresh strategy, and friction control.',
    applicableStepTypes: ['refresh'],
  },
];
