import type { RoutineEvaluation } from '@/features/evaluation/types';
import type { DerivedRecommendation, Override } from '@/features/recommendations/types';
import type { Routine } from '@/types/domain';

function hasOverride(
  overrides: Override[],
  routineStepId: string,
  productId: string | null,
): boolean {
  return overrides.some(
    (override) => override.routineStepId === routineStepId && override.productId === productId,
  );
}

// SDS §17.1/§22: turns routine evaluation output into actionable recommendations,
// suppressing anything the user has already resolved via an override.
export function deriveRecommendations(
  routine: Routine,
  evaluation: RoutineEvaluation,
  overrides: Override[],
): DerivedRecommendation[] {
  const recommendations: DerivedRecommendation[] = [];

  for (const missing of evaluation.missingSteps) {
    const step = routine.steps.find((candidate) => candidate.stepType === missing.stepType);
    if (!step || hasOverride(overrides, step.id, null)) continue;

    const label = step.stepType.replaceAll('_', ' ');
    recommendations.push({
      id: `${step.id}:missing`,
      source: 'missing_step',
      routineStepId: step.id,
      productId: null,
      stepType: step.stepType,
      summary: `Add a ${label} step`,
      whyThisHelps: `This routine expects a ${missing.requirementLevel.replaceAll('_', ' ')} ${label} step, but no product is assigned yet.`,
    });
  }

  for (const stepEvaluation of evaluation.stepEvaluations) {
    for (const productEvaluation of stepEvaluation.productEvaluations) {
      const { rating } = productEvaluation.evaluation;
      if (rating !== 'poor_fit' && rating !== 'weak_fit') continue;
      if (hasOverride(overrides, stepEvaluation.stepId, productEvaluation.productId)) continue;

      recommendations.push({
        id: `${stepEvaluation.stepId}:${productEvaluation.productId}`,
        source: 'poor_fit_product',
        routineStepId: stepEvaluation.stepId,
        productId: productEvaluation.productId,
        stepType: stepEvaluation.stepType,
        summary: `Consider replacing your ${stepEvaluation.stepType.replaceAll('_', ' ')} product`,
        whyThisHelps: productEvaluation.evaluation.explanation.userVisibleMessage,
        rating,
      });
    }
  }

  return recommendations;
}
