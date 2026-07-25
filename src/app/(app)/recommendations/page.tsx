import { Card } from '@/components/Card';
import { getProductById, mockRecommendations } from '@/lib/mock-data';

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Recommendations</h1>

      <ul className="flex flex-col gap-3">
        {mockRecommendations.map((recommendation) => (
          <li key={recommendation.id}>
            <Card>
              <p className="font-medium text-zinc-900">{recommendation.summary}</p>
              <p className="mt-1 text-sm text-zinc-600">{recommendation.whyThisHelps}</p>
              {recommendation.relatedProductIds.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {recommendation.relatedProductIds.map((productId) => {
                    const product = getProductById(productId);
                    if (!product) return null;
                    return (
                      <li
                        key={productId}
                        className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
                      >
                        {product.name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
