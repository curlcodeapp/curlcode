import Link from 'next/link';

import { Card } from '@/components/Card';
import { recordOverride, undoOverride } from '@/features/recommendations/actions';
import { getRoutineRecommendations } from '@/features/recommendations/data';
import { getProductById } from '@/lib/mock-data';

export default async function RecommendationsPage() {
  const data = await getRoutineRecommendations();

  if (!data) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-zinc-900">Recommendations</h1>
        <Card>
          <p className="text-sm text-zinc-500">
            Activate a routine to get personalized recommendations.
          </p>
          <Link href="/routines" className="mt-2 inline-block text-sm font-medium text-violet-600">
            Go to Routines →
          </Link>
        </Card>
      </div>
    );
  }

  const { recommendations, overrides } = data;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Recommendations</h1>

      {recommendations.length === 0 ? (
        <Card>
          <p className="text-sm text-zinc-500">
            You&apos;re all set — no recommendations right now.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {recommendations.map((recommendation) => {
            const product = recommendation.productId
              ? getProductById(recommendation.productId)
              : null;
            return (
              <li key={recommendation.id}>
                <Card>
                  <p className="font-medium text-zinc-900">{recommendation.summary}</p>
                  <p className="mt-1 text-sm text-zinc-600">{recommendation.whyThisHelps}</p>
                  {product && (
                    <span className="mt-2 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                      {product.name}
                    </span>
                  )}
                  <div className="mt-3 flex gap-2">
                    {recommendation.source === 'poor_fit_product' && (
                      <form
                        action={recordOverride.bind(
                          null,
                          recommendation.routineStepId,
                          recommendation.productId,
                          'replace_product',
                          'retain_product',
                        )}
                      >
                        <button
                          type="submit"
                          className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700"
                        >
                          Keep it anyway
                        </button>
                      </form>
                    )}
                    <form
                      action={recordOverride.bind(
                        null,
                        recommendation.routineStepId,
                        recommendation.productId,
                        recommendation.source === 'missing_step' ? 'add_step' : 'replace_product',
                        'dismissed',
                      )}
                    >
                      <button
                        type="submit"
                        className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700"
                      >
                        Dismiss
                      </button>
                    </form>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      {overrides.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Resolved
          </h2>
          <ul className="flex flex-col gap-2">
            {overrides.map((override) => {
              const product = override.productId ? getProductById(override.productId) : null;
              return (
                <li key={override.id}>
                  <Card className="flex items-center justify-between">
                    <p className="text-sm text-zinc-700">
                      {product ? product.name : 'Missing step'} —{' '}
                      {override.userDecision === 'retain_product' ? 'Kept' : 'Dismissed'}
                    </p>
                    <form action={undoOverride.bind(null, override.id)}>
                      <button type="submit" className="text-xs font-medium text-violet-600">
                        Undo
                      </button>
                    </form>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
