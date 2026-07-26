'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { mockRoutine } from '@/lib/mock-data';

export async function activateRoutineTemplate() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in.');
  }

  const { data: existing, error: existingError } = await supabase
    .from('routines')
    .select('id')
    .eq('status', 'active')
    .maybeSingle();
  if (existingError) throw existingError;
  if (existing) {
    // Already active — nothing to do (SDS §34.3: at most one active routine per user).
    return;
  }

  const { data: routine, error: routineError } = await supabase
    .from('routines')
    .insert({
      user_id: user.id,
      name: mockRoutine.name,
      target_style_id: mockRoutine.targetStyleId,
      status: 'active',
      wash_cycle_days: mockRoutine.washCycleDays,
    })
    .select('id')
    .single();
  if (routineError) throw routineError;

  const orderedSteps = mockRoutine.steps.slice().sort((a, b) => a.sequence - b.sequence);

  const { data: insertedSteps, error: stepsError } = await supabase
    .from('routine_steps')
    .insert(
      orderedSteps.map((step) => ({
        routine_id: routine.id,
        sequence: step.sequence,
        step_type: step.stepType,
        requirement_level: step.requirementLevel,
      })),
    )
    .select('id, sequence');
  if (stepsError) throw stepsError;

  const stepIdBySequence = new Map(insertedSteps.map((step) => [step.sequence, step.id]));

  const productAssignments = orderedSteps.flatMap((step) => {
    const routineStepId = stepIdBySequence.get(step.sequence);
    if (!routineStepId) return [];
    return step.assignedProductIds.map((productId) => ({
      routine_step_id: routineStepId,
      product_id: productId,
    }));
  });

  if (productAssignments.length > 0) {
    const { error: productsError } = await supabase
      .from('routine_step_products')
      .insert(productAssignments);
    if (productsError) throw productsError;
  }

  revalidatePath('/today');
  revalidatePath('/routines');
}
