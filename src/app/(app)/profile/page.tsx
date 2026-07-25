import { Card } from '@/components/Card';
import { mockHairProfile } from '@/lib/mock-data';

const PROFILE_FIELDS: Array<{ label: string; value: string }> = [
  { label: 'Curl pattern', value: mockHairProfile.curlPattern },
  { label: 'Density', value: mockHairProfile.density },
  { label: 'Porosity', value: mockHairProfile.porosity },
  { label: 'Thickness', value: mockHairProfile.thickness },
  { label: 'Scalp type', value: mockHairProfile.scalpType },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Profile</h1>

      <Card>
        <h2 className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Hair profile
        </h2>
        <dl className="flex flex-col gap-2 text-sm">
          {PROFILE_FIELDS.map((field) => (
            <div key={field.label} className="flex justify-between">
              <dt className="text-zinc-500">{field.label}</dt>
              <dd className="font-medium text-zinc-900 capitalize">{field.value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <h2 className="mb-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Goal</h2>
        <p className="text-sm text-zinc-700">{mockHairProfile.goal}</p>
      </Card>
    </div>
  );
}
