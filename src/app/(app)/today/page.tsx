import Link from 'next/link';

import { Card } from '@/components/Card';
import { mockHairProfile, mockRecommendations, mockRoutine } from '@/lib/mock-data';

export default function TodayPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Good morning 👋</h1>

      <Card>
        <h2 className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Hair summary
        </h2>
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <dt className="text-zinc-500">Curl pattern</dt>
            <dd className="font-medium text-zinc-900">{mockHairProfile.curlPattern}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Density</dt>
            <dd className="font-medium text-zinc-900 capitalize">{mockHairProfile.density}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Porosity</dt>
            <dd className="font-medium text-zinc-900 capitalize">{mockHairProfile.porosity}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Scalp</dt>
            <dd className="font-medium text-zinc-900 capitalize">{mockHairProfile.scalpType}</dd>
          </div>
        </dl>
        <Link href="/profile" className="mt-3 inline-block text-sm font-medium text-violet-600">
          View full profile →
        </Link>
      </Card>

      <Card>
        <h2 className="mb-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Today&apos;s routine
        </h2>
        <p className="text-lg font-semibold text-zinc-900">{mockRoutine.name}</p>
        <p className="mb-3 text-sm text-zinc-500">{mockRoutine.steps.length} steps</p>
        <Link
          href="/routines"
          className="inline-block rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
        >
          View Routine
        </Link>
      </Card>

      <Card>
        <h2 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Recommendations
        </h2>
        <p className="text-sm text-zinc-700">
          {mockRecommendations.length} new recommendations for you to review
        </p>
        <Link
          href="/recommendations"
          className="mt-2 inline-block text-sm font-medium text-violet-600"
        >
          Review now →
        </Link>
      </Card>
    </div>
  );
}
