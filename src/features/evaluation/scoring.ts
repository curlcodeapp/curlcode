import type { FRDefinition, Product, Routine, RoutineStep } from '@/types/domain';
import type {
  MissingStep,
  ProductEvaluation,
  ProductExplanation,
  Rating,
  RoutineEvaluation,
  RoutineStepEvaluation,
} from '@/features/evaluation/types';

// SDS §14.3 Default Score Bands.
const SCORE_BANDS: ReadonlyArray<{ min: number; rating: Rating }> = [
  { min: 85, rating: 'excellent_fit' },
  { min: 70, rating: 'good_fit' },
  { min: 55, rating: 'acceptable_with_conditions' },
  { min: 40, rating: 'weak_fit' },
  { min: 0, rating: 'poor_fit' },
];

function ratingForScore(score: number): Rating {
  const band = SCORE_BANDS.find((candidate) => score >= candidate.min);
  return band ? band.rating : 'poor_fit';
}

function requiredFRsForStep(step: RoutineStep, frDefinitions: FRDefinition[]): FRDefinition[] {
  return frDefinitions.filter((fr) => fr.applicableStepTypes.includes(step.stepType));
}

function humanizeFRName(fr: FRDefinition): string {
  return fr.name.replaceAll('_', ' ');
}

function unableToEvaluate(reason: string): ProductEvaluation {
  const explanation: ProductExplanation = {
    decision: 'retain_existing_product',
    summary: reason,
    supportingFactors: [],
    limitingFactors: [],
    matchedFR: [],
    missingFR: [],
    confidence: 0.3,
    userVisibleMessage: `${reason} We don't have enough rule coverage yet to make a confident call, so it's kept as-is.`,
  };
  return {
    overallScore: null,
    frCoverageScore: null,
    confidenceScore: 0.3,
    rating: 'unable_to_evaluate',
    explanation,
  };
}

// SDS §14 Existing Product Evaluation Engine, scoped to what our mock catalog can back:
// overall_score is fr_coverage_score alone today. hair/scalp/style/routine compatibility
// scores from §14.2 aren't modeled — that needs per-product hair/scalp signals our mock
// catalog doesn't carry yet.
export function evaluateProductForStep(
  product: Product,
  step: RoutineStep,
  frDefinitions: FRDefinition[],
): ProductEvaluation {
  const requiredFRs = requiredFRsForStep(step, frDefinitions);

  if (requiredFRs.length === 0) {
    return unableToEvaluate(
      `No functional requirements are defined yet for the "${step.stepType.replaceAll('_', ' ')}" step.`,
    );
  }

  const matchedFR: string[] = [];
  const missingFR: string[] = [];
  const supportingFactors: string[] = [];
  const limitingFactors: string[] = [];
  let totalScore = 0;

  for (const fr of requiredFRs) {
    const coverage = product.frCoverage.find((entry) => entry.frId === fr.frId);
    if (coverage) {
      matchedFR.push(fr.frId);
      totalScore += coverage.score;
      supportingFactors.push(`Covers ${humanizeFRName(fr)} (score ${coverage.score}/100)`);
    } else {
      missingFR.push(fr.frId);
      limitingFactors.push(`Missing coverage for ${humanizeFRName(fr)}`);
    }
  }

  const frCoverageScore = Math.round(totalScore / requiredFRs.length);
  const overallScore = frCoverageScore;
  const rating = ratingForScore(overallScore);
  const confidenceScore = missingFR.length === 0 ? 0.8 : 0.5;

  const isGoodFit = rating === 'excellent_fit' || rating === 'good_fit';
  const decision = isGoodFit ? 'retain_existing_product' : 'replace_product';

  const summary = isGoodFit
    ? `Covers all ${requiredFRs.length} functional requirement(s) for this step.`
    : `Covers ${matchedFR.length} of ${requiredFRs.length} functional requirement(s) for this step.`;

  const userVisibleMessage = isGoodFit
    ? 'This product is a good match for this step — no changes needed.'
    : `This product may not fully ${limitingFactors.length > 0 ? limitingFactors.join('; ').toLowerCase() : 'meet the requirements'} — consider an alternative.`;

  return {
    overallScore,
    frCoverageScore,
    confidenceScore,
    rating,
    explanation: {
      decision,
      summary,
      supportingFactors,
      limitingFactors,
      matchedFR,
      missingFR,
      confidence: confidenceScore,
      userVisibleMessage,
    },
  };
}

// SDS §15 Routine Evaluation Engine, scoped to step coverage + per-product fit — cumulative
// exposure, frequency scoring, and redundant/conflicting-step detection aren't implemented yet.
export function evaluateRoutine(
  routine: Routine,
  products: Product[],
  frDefinitions: FRDefinition[],
): RoutineEvaluation {
  const productById = new Map(products.map((product) => [product.id, product]));

  const stepEvaluations: RoutineStepEvaluation[] = routine.steps.map((step) => ({
    stepId: step.id,
    stepType: step.stepType,
    productEvaluations: step.assignedProductIds.map((productId) => {
      const product = productById.get(productId);
      return {
        productId,
        evaluation: product
          ? evaluateProductForStep(product, step, frDefinitions)
          : unableToEvaluate('This product could not be found in the catalog.'),
      };
    }),
  }));

  const missingSteps: MissingStep[] = routine.steps
    .filter(
      (step) =>
        (step.requirementLevel === 'required' ||
          step.requirementLevel === 'required_recommended') &&
        step.assignedProductIds.length === 0,
    )
    .map((step) => ({ stepType: step.stepType, requirementLevel: step.requirementLevel }));

  return { routineId: routine.id, stepEvaluations, missingSteps };
}
