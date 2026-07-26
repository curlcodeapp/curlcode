import { createClient } from '@/lib/supabase/server';
import type { HairProfile } from '@/types/domain';

interface HairProfileRow {
  id: string;
  curl_pattern: string;
  density: string;
  porosity: string;
  thickness: string;
  scalp_type: string;
  goal: string;
}

function rowToHairProfile(row: HairProfileRow): HairProfile {
  return {
    id: row.id,
    curlPattern: row.curl_pattern as HairProfile['curlPattern'],
    density: row.density as HairProfile['density'],
    porosity: row.porosity as HairProfile['porosity'],
    thickness: row.thickness as HairProfile['thickness'],
    scalpType: row.scalp_type as HairProfile['scalpType'],
    goal: row.goal,
  };
}

export async function getHairProfile(): Promise<HairProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('hair_profiles').select('*').maybeSingle();
  if (error) throw error;
  return data ? rowToHairProfile(data as HairProfileRow) : null;
}
