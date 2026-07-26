import type { RecommendationDecision, RequirementLevel, StepType } from '@/types/domain';

// Mirrors SDS §14.2/§14.3 rating bands. "unable_to_evaluate" covers step types our
// mock FR subset doesn't cover yet, not just low scores.
export type Rating =
  | 'excellent_fit'
  | 'good_fit'
  | 'acceptable_with_conditions'
  | 'weak_fit'
  | 'poor_fit'
  | 'unable_to_evaluate';

// SDS §18 Explainability Requirements, trimmed to the fields this MVP can back with real data.
export interface ProductExplanation {
  decision: RecommendationDecision;
  summary: string;
  supportingFactors: string[];
  limitingFactors: string[];
  matchedFR: string[];
  missingFR: string[];
  confidence: number;
  userVisibleMessage: string;
}

// SDS §14.2 Existing Product Evaluation output, trimmed to the fields this MVP can back with
// real data — only fr_coverage_score is currently modeled; hair/scalp/style/routine
// compatibility need signals our mock catalog doesn't carry yet.
export interface ProductEvaluation {
  overallScore: number | null;
  frCoverageScore: number | null;
  confidenceScore: number;
  rating: Rating;
  explanation: ProductExplanation;
}

export interface RoutineStepProductEvaluation {
  productId: string;
  evaluation: ProductEvaluation;
}

export interface RoutineStepEvaluation {
  stepId: string;
  stepType: StepType;
  productEvaluations: RoutineStepProductEvaluation[];
}

export interface MissingStep {
  stepType: StepType;
  requirementLevel: RequirementLevel;
}

// SDS §15 Routine Evaluation output, trimmed similarly — this MVP only computes step
// coverage and per-step product fit, not cumulative-exposure or frequency scoring.
export interface RoutineEvaluation {
  routineId: string;
  stepEvaluations: RoutineStepEvaluation[];
  missingSteps: MissingStep[];
}
