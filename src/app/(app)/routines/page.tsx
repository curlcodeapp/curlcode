import { Card } from '@/components/Card';
import { getProductById, mockRoutine } from '@/lib/mock-data';

const REQUIREMENT_LABEL: Record<string, string> = {
  required: 'Required',
  required_recommended: 'Recommended',
  conditional: 'Conditional',
  optional: 'Optional',
  not_recommended: 'Not recommended',
};

export default function RoutinesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Routines</h1>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-semibold text-zinc-900">{mockRoutine.name}</p>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 capitalize">
            {mockRoutine.status}
          </span>
        </div>
        <p className="mb-4 text-sm text-zinc-500">
          Wash cycle: every {mockRoutine.washCycleDays} days
        </p>

        <ol className="flex flex-col gap-3">
          {mockRoutine.steps
            .slice()
            .sort((a, b) => a.sequence - b.sequence)
            .map((step) => (
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
                  <ul className="mt-1 text-sm text-zinc-600">
                    {step.assignedProductIds.map((productId) => {
                      const product = getProductById(productId);
                      return <li key={productId}>{product?.name ?? 'Unknown product'}</li>;
                    })}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-zinc-400 italic">No product assigned</p>
                )}
              </li>
            ))}
        </ol>
      </Card>
    </div>
  );
}
