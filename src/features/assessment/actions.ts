'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import type { CurlPattern, Density, Porosity, ScalpType, Thickness } from '@/types/domain';

export interface SaveProfileState {
  error: string | null;
}

function readString(formData: FormData, field: string): string | null {
  const value = formData.get(field);
  return typeof value === 'string' && value.length > 0 ? value : null;
}

export async function saveHairProfile(
  _prevState: SaveProfileState,
  formData: FormData,
): Promise<SaveProfileState> {
  const curlPattern = readString(formData, 'curlPattern') as CurlPattern | null;
  const density = readString(formData, 'density') as Density | null;
  const porosity = readString(formData, 'porosity') as Porosity | null;
  const thickness = readString(formData, 'thickness') as Thickness | null;
  const scalpType = readString(formData, 'scalpType') as ScalpType | null;
  const goal = readString(formData, 'goal');

  if (!curlPattern || !density || !porosity || !thickness || !scalpType || !goal) {
    return { error: 'All fields are required.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'You must be logged in.' };
  }

  const { error } = await supabase.from('hair_profiles').upsert(
    {
      user_id: user.id,
      curl_pattern: curlPattern,
      density,
      porosity,
      thickness,
      scalp_type: scalpType,
      goal,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/today');
  revalidatePath('/profile');
  return { error: null };
}
