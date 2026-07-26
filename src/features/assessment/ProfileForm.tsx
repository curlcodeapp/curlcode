'use client';

import { useActionState } from 'react';

import { saveHairProfile, type SaveProfileState } from '@/features/assessment/actions';
import type { HairProfile } from '@/types/domain';

const CURL_PATTERNS = ['1', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C'] as const;
const DENSITIES = ['low', 'medium', 'high'] as const;
const POROSITIES = ['low', 'medium', 'high'] as const;
const THICKNESSES = ['fine', 'medium', 'coarse'] as const;
const SCALP_TYPES = ['dry', 'balanced', 'oily'] as const;

const INITIAL_STATE: SaveProfileState = { error: null };

const selectClass =
  'rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 capitalize';

export function ProfileForm({ profile }: { profile: HairProfile | null }) {
  const [state, formAction, pending] = useActionState(saveHairProfile, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm text-zinc-600">
        Curl pattern
        <select
          name="curlPattern"
          defaultValue={profile?.curlPattern ?? CURL_PATTERNS[0]}
          className={selectClass}
        >
          {CURL_PATTERNS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-600">
        Density
        <select
          name="density"
          defaultValue={profile?.density ?? DENSITIES[1]}
          className={selectClass}
        >
          {DENSITIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-600">
        Porosity
        <select
          name="porosity"
          defaultValue={profile?.porosity ?? POROSITIES[1]}
          className={selectClass}
        >
          {POROSITIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-600">
        Thickness
        <select
          name="thickness"
          defaultValue={profile?.thickness ?? THICKNESSES[1]}
          className={selectClass}
        >
          {THICKNESSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-600">
        Scalp type
        <select
          name="scalpType"
          defaultValue={profile?.scalpType ?? SCALP_TYPES[1]}
          className={selectClass}
        >
          {SCALP_TYPES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-600">
        Goal
        <input
          name="goal"
          type="text"
          required
          defaultValue={profile?.goal ?? ''}
          placeholder="e.g. Reduce frizz and improve curl definition"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        />
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {profile ? 'Save changes' : 'Save profile'}
      </button>
    </form>
  );
}
