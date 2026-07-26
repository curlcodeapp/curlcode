import { Card } from '@/components/Card';
import { frDefinitions } from '@/config/fr-definitions';
import { evaluateRoutine } from '@/features/evaluation/scoring';
import type { Rating } from '@/features/evaluation/types';
import { activateRoutineTemplate } from '@/features/routines/actions';
import { getActiveRoutine } from '@/features/routines/data';
import { getProductById, mockProducts, mockRoutine } from '@/lib/mock-data';

const REQUIREMENT_LABEL: Record<string, string> = {
  required: 'Required',
  required_recommended: 'Recommended',
  conditional: 'Conditional',
  optional: 'Optional',
  not_recommended: 'Not recommended',
};

const RATING_LABEL: Record<Rating, string> = {
  excellent_fit: 'Excellent fit',
  good_fit: 'Good fit',
  acceptable_with_conditions: 'Acceptable',
  weak_fit: 'Weak fit',
  poor_fit: 'Poor fit',
  unable_to_evaluate: 'Not yet evaluated',
};

const RATING_BADGE_CLASS: Record<Rating, string> = {
  excellent_fit: 'bg-emerald-100 text-emerald-700',
  good_fit: 'bg-emerald-50 text-emerald-600',
  acceptable_with_conditions: 'bg-amber-100 text-amber-700',
  weak_fit: 'bg-orange-100 text-orange-700',
  poor_fit: 'bg-red-100 text-red-700',
  unable_to_evaluate: 'bg-zinc-100 text-zinc-500',
};

export default async function RoutinesPage() {
  const routine = await getActiveRoutine();
  const evaluation = routine ? evaluateRoutine(routine, mockProducts, frDefinitions) : null;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Routines</h1>

      {!routine ? (
        <Card>
          <p className="mb-1 font-semibold text-zinc-900">{mockRoutine.name}</p>
          <p className="mb-4 text-sm text-zinc-500">
            {mockRoutine.steps.length} steps · every {mockRoutine.washCycleDays} days
          </p>
          <form action={activateRoutineTemplate}>
            <button
              type="submit"
              className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Activate this routine
            </button>
          </form>
        </Card>
      ) : (
        <>
          {evaluation && evaluation.missingSteps.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <p className="mb-1 text-xs font-semibold tracking-wide text-amber-700 uppercase">
                Missing steps
              </p>
              <ul className="text-sm text-amber-800">
                {evaluation.missingSteps.map((missing) => (
                  <li key={missing.stepType}>
                    {REQUIREMENT_LABEL[missing.requirementLevel]} step &ldquo;
                    {missing.stepType.replaceAll('_', ' ')}&rdquo; has no product assigned yet.
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-zinc-900">{routine.name}</p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 capitalize">
                {routine.status}
              </span>
            </div>
            <p className="mb-4 text-sm text-zinc-500">
              Wash cycle: every {routine.washCycleDays} days
            </p>

            <ol className="flex flex-col gap-3">
              {routine.steps
                .slice()
                .sort((a, b) => a.sequence - b.sequence)
                .map((step) => {
                  const stepEvaluation = evaluation?.stepEvaluations.find(
                    (candidate) => candidate.stepId === step.id,
                  );
                  return (
                    <li
                      key={step.id}
                      className="border-t border-zinc-100 pt-3 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-zinc-900 capitalize">
                          {step.sequence}. {step.stepType.replace('_', ' ')}
                        </p>
                        <span className="text-xs text-zinc-500">
                          {REQUIREMENT_LABEL[step.requirementLevel]}
                        </span>
                      </div>
                      {step.assignedProductIds.length > 0 ? (
                        <ul className="mt-1 flex flex-col gap-2 text-sm text-zinc-600">
                          {step.assignedProductIds.map((productId) => {
                            const product = getProductById(productId);
                            const productEvaluation = stepEvaluation?.productEvaluations.find(
                              (candidate) => candidate.productId === productId,
                            )?.evaluation;
                            return (
                              <li key={productId}>
                                <div className="flex items-center gap-2">
                                  <span>{product?.name ?? 'Unknown product'}</span>
                                  {productEvaluation && (
                                    <span
                                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${RATING_BADGE_CLASS[productEvaluation.rating]}`}
                                    >
                                      {RATING_LABEL[productEvaluation.rating]}
                                    </span>
                                  )}
                                </div>
                                {productEvaluation && (
                                  <p className="mt-0.5 text-xs text-zinc-500">
                                    {productEvaluation.explanation.userVisibleMessage}
                                  </p>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="mt-1 text-sm text-zinc-400 italic">No product assigned</p>
                      )}
                    </li>
                  );
                })}
            </ol>
          </Card>
        </>
      )}
    </div>
  );
}
