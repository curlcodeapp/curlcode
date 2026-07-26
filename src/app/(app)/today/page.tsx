import Link from 'next/link';

import { Card } from '@/components/Card';
import { getHairProfile } from '@/features/assessment/data';
import { getRoutineRecommendations } from '@/features/recommendations/data';

export default async function TodayPage() {
  const [profile, routineData] = await Promise.all([getHairProfile(), getRoutineRecommendations()]);
  const routine = routineData?.routine ?? null;
  const recommendationCount = routineData?.recommendations.length ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Good morning 👋</h1>

      <Card>
        <h2 className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Hair summary
        </h2>
        {profile ? (
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <div>
              <dt className="text-zinc-500">Curl pattern</dt>
              <dd className="font-medium text-zinc-900">{profile.curlPattern}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Density</dt>
              <dd className="font-medium text-zinc-900 capitalize">{profile.density}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Porosity</dt>
              <dd className="font-medium text-zinc-900 capitalize">{profile.porosity}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Scalp</dt>
              <dd className="font-medium text-zinc-900 capitalize">{profile.scalpType}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-zinc-500">You haven&apos;t completed your hair profile yet.</p>
        )}
        <Link href="/profile" className="mt-3 inline-block text-sm font-medium text-violet-600">
          {profile ? 'View full profile →' : 'Complete your profile →'}
        </Link>
      </Card>

      <Card>
        <h2 className="mb-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Today&apos;s routine
        </h2>
        {routine ? (
          <>
            <p className="text-lg font-semibold text-zinc-900">{routine.name}</p>
            <p className="mb-3 text-sm text-zinc-500">{routine.steps.length} steps</p>
          </>
        ) : (
          <p className="mb-3 text-sm text-zinc-500">You haven&apos;t activated a routine yet.</p>
        )}
        <Link
          href="/routines"
          className="inline-block rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {routine ? 'View Routine' : 'Set up a routine'}
        </Link>
      </Card>

      <Card>
        <h2 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Recommendations
        </h2>
        <p className="text-sm text-zinc-700">
          {routine
            ? `${recommendationCount} recommendation${recommendationCount === 1 ? '' : 's'} for you to review`
            : 'Activate a routine to get recommendations'}
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
