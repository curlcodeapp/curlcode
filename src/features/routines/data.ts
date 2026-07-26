import { createClient } from '@/lib/supabase/server';
import type { RequirementLevel, Routine, StepType } from '@/types/domain';

interface RoutineRow {
  id: string;
  name: string;
  target_style_id: string;
  status: Routine['status'];
  wash_cycle_days: number;
}

interface RoutineStepRow {
  id: string;
  sequence: number;
  step_type: StepType;
  requirement_level: RequirementLevel;
}

interface RoutineStepProductRow {
  routine_step_id: string;
  product_id: string;
}

export async function getActiveRoutine(): Promise<Routine | null> {
  const supabase = await createClient();

  const { data: routineRow, error: routineError } = await supabase
    .from('routines')
    .select('id, name, target_style_id, status, wash_cycle_days')
    .eq('status', 'active')
    .maybeSingle();
  if (routineError) throw routineError;
  if (!routineRow) return null;

  const routine = routineRow as RoutineRow;

  const { data: stepRows, error: stepsError } = await supabase
    .from('routine_steps')
    .select('id, sequence, step_type, requirement_level')
    .eq('routine_id', routine.id)
    .order('sequence', { ascending: true });
  if (stepsError) throw stepsError;

  const steps = (stepRows ?? []) as RoutineStepRow[];
  const stepIds = steps.map((step) => step.id);

  const { data: productRows, error: productsError } =
    stepIds.length === 0
      ? { data: [] as RoutineStepProductRow[], error: null }
      : await supabase
          .from('routine_step_products')
          .select('routine_step_id, product_id')
          .in('routine_step_id', stepIds);
  if (productsError) throw productsError;

  const productsByStepId = new Map<string, string[]>();
  for (const row of (productRows ?? []) as RoutineStepProductRow[]) {
    const existing = productsByStepId.get(row.routine_step_id) ?? [];
    existing.push(row.product_id);
    productsByStepId.set(row.routine_step_id, existing);
  }

  return {
    id: routine.id,
    name: routine.name,
    targetStyleId: routine.target_style_id,
    status: routine.status,
    washCycleDays: routine.wash_cycle_days,
    steps: steps.map((step) => ({
      id: step.id,
      sequence: step.sequence,
      stepType: step.step_type,
      requirementLevel: step.requirement_level,
      assignedProductIds: productsByStepId.get(step.id) ?? [],
    })),
  };
}
