// Domain types mirroring SDS §5 (Core Domain Model). Scoped to what the MVP UI renders;
// fields absent here (versioning, evaluation snapshots, etc.) are added when M2/M3 need them.

export type CurlPattern = '1' | '2A' | '2B' | '2C' | '3A' | '3B' | '3C' | '4A' | '4B' | '4C';
export type Porosity = 'low' | 'medium' | 'high';
export type Density = 'low' | 'medium' | 'high';
export type Thickness = 'fine' | 'medium' | 'coarse';
export type ScalpType = 'dry' | 'balanced' | 'oily';

export interface HairProfile {
  id: string;
  curlPattern: CurlPattern;
  density: Density;
  porosity: Porosity;
  thickness: Thickness;
  scalpType: ScalpType;
  goal: string;
}

export interface Hairstyle {
  id: string;
  name: string;
  description: string;
}

export type StepType =
  | 'pre_poo'
  | 'detangle'
  | 'cleanse'
  | 'clarify'
  | 'condition'
  | 'deep_condition'
  | 'protein_treatment'
  | 'leave_in'
  | 'heat_protect'
  | 'moisturize'
  | 'seal'
  | 'define'
  | 'refresh';

export type RequirementLevel =
  'required' | 'conditional' | 'required_recommended' | 'optional' | 'not_recommended';

export interface RoutineStep {
  id: string;
  sequence: number;
  stepType: StepType;
  requirementLevel: RequirementLevel;
  assignedProductIds: string[];
}

export type RoutineStatus = 'draft' | 'active' | 'archived';

export interface Routine {
  id: string;
  name: string;
  targetStyleId: string;
  status: RoutineStatus;
  washCycleDays: number;
  steps: RoutineStep[];
}

export type ProductType =
  | 'shampoo'
  | 'conditioner'
  | 'leave_in'
  | 'deep_conditioner'
  | 'styler'
  | 'oil'
  | 'heat_protectant'
  | 'protein_treatment';

export interface FRCoverage {
  frId: string;
  score: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  type: ProductType;
  ingredients: string[];
  frCoverage: FRCoverage[];
}

export type TargetArea = 'Hair Fiber' | 'Scalp' | 'Styling' | 'Cleansing';

// Mirrors the real HairMechanisms table (docs/product/CurlCode_Recommendation_Engine_Tables.xlsx).
export interface FRDefinition {
  frId: string;
  mechanism: string;
  uxLabel: string;
  targetArea: TargetArea;
  description: string;
  implementationNotes: string;
  // Derived from the real ProductCategories sheet's (Routine_Stage, FR_ID) pairs, narrowed to
  // the 1-2 FRs most centrally defining each step's purpose — see src/config/fr-definitions.ts.
  applicableStepTypes: StepType[];
}

export type RecommendationDecision =
  'retain_existing_product' | 'adjust_usage' | 'add_step' | 'replace_product' | 'offer_alternative';
