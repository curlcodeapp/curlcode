import { Card } from '@/components/Card';
import { mockProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>
      <p className="text-sm text-zinc-500">{mockProducts.length} products in your catalog</p>

      <ul className="flex flex-col gap-3">
        {mockProducts.map((product) => (
          <li key={product.id}>
            <Card className="flex items-center justify-between">
              <div>
                <p className="font-medium text-zinc-900">{product.name}</p>
                <p className="text-sm text-zinc-500">{product.brand}</p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 capitalize">
                {product.type.replace('_', ' ')}
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
