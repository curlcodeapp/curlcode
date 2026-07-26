import { Card } from '@/components/Card';
import { signOut } from '@/features/auth/actions';
import { getHairProfile } from '@/features/assessment/data';
import { ProfileForm } from '@/features/assessment/ProfileForm';

export default async function ProfilePage() {
  const profile = await getHairProfile();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900">Profile</h1>
        <form action={signOut}>
          <button type="submit" className="text-sm font-medium text-red-600">
            Log out
          </button>
        </form>
      </div>

      <Card>
        <h2 className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Hair profile
        </h2>
        {!profile && (
          <p className="mb-3 text-sm text-zinc-500">
            You haven&apos;t completed your hair profile yet.
          </p>
        )}
        <ProfileForm profile={profile} />
      </Card>
    </div>
  );
}
