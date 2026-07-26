'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

// SDS §19: records the user's decision on a recommendation without altering the
// underlying evaluation classification. Idempotent — recalling with the same
// (routineStepId, productId) is a no-op if already recorded.
export async function recordOverride(
  routineStepId: string,
  productId: string | null,
  systemDecision: 'replace_product' | 'add_step',
  userDecision: 'retain_product' | 'dismissed',
) {
  const supabase = await createClient();

  let existingQuery = supabase.from('overrides').select('id').eq('routine_step_id', routineStepId);
  existingQuery = productId
    ? existingQuery.eq('product_id', productId)
    : existingQuery.is('product_id', null);
  const { data: existing, error: existingError } = await existingQuery.maybeSingle();
  if (existingError) throw existingError;
  if (existing) return;

  const { error } = await supabase.from('overrides').insert({
    routine_step_id: routineStepId,
    product_id: productId,
    system_decision: systemDecision,
    user_decision: userDecision,
  });
  if (error) throw error;

  revalidatePath('/today');
  revalidatePath('/recommendations');
}

export async function undoOverride(overrideId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('overrides').delete().eq('id', overrideId);
  if (error) throw error;

  revalidatePath('/today');
  revalidatePath('/recommendations');
}
