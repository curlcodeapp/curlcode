import { frDefinitions } from '@/config/fr-definitions';
import { evaluateRoutine } from '@/features/evaluation/scoring';
import type { RoutineEvaluation } from '@/features/evaluation/types';
import { deriveRecommendations } from '@/features/recommendations/derive';
import type { DerivedRecommendation, Override } from '@/features/recommendations/types';
import { getActiveRoutine } from '@/features/routines/data';
import { createClient } from '@/lib/supabase/server';
import { mockProducts } from '@/lib/mock-data';
import type { Routine } from '@/types/domain';

interface OverrideRow {
  id: string;
  routine_step_id: string;
  product_id: string | null;
  system_decision: Override['systemDecision'];
  user_decision: Override['userDecision'];
}

export async function getOverridesForRoutineSteps(routineStepIds: string[]): Promise<Override[]> {
  if (routineStepIds.length === 0) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('overrides')
    .select('id, routine_step_id, product_id, system_decision, user_decision')
    .in('routine_step_id', routineStepIds);
  if (error) throw error;

  return (data as OverrideRow[]).map((row) => ({
    id: row.id,
    routineStepId: row.routine_step_id,
    productId: row.product_id,
    systemDecision: row.system_decision,
    userDecision: row.user_decision,
  }));
}

export interface RoutineRecommendations {
  routine: Routine;
  evaluation: RoutineEvaluation;
  overrides: Override[];
  recommendations: DerivedRecommendation[];
}

// Composes the active routine, its evaluation, stored overrides, and the resulting live
// recommendations — the single source both the Today and Recommendations screens read from.
export async function getRoutineRecommendations(): Promise<RoutineRecommendations | null> {
  const routine = await getActiveRoutine();
  if (!routine) return null;

  const evaluation = evaluateRoutine(routine, mockProducts, frDefinitions);
  const overrides = await getOverridesForRoutineSteps(routine.steps.map((step) => step.id));
  const recommendations = deriveRecommendations(routine, evaluation, overrides);

  return { routine, evaluation, overrides, recommendations };
}
