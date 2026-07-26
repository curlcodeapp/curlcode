import type { Rating } from '@/features/evaluation/types';
import type { StepType } from '@/types/domain';

export type RecommendationSource = 'missing_step' | 'poor_fit_product';

// A recommendation derived live from evaluateRoutine() + stored overrides — not mock data.
export interface DerivedRecommendation {
  id: string;
  source: RecommendationSource;
  routineStepId: string;
  productId: string | null;
  stepType: StepType;
  summary: string;
  whyThisHelps: string;
  rating?: Rating;
}

// Mirrors SDS §19's override schema, trimmed to what this MVP persists.
export interface Override {
  id: string;
  routineStepId: string;
  productId: string | null;
  systemDecision: 'replace_product' | 'add_step';
  userDecision: 'retain_product' | 'dismissed';
}
