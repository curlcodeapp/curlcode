import { describe, expect, it } from 'vitest';

import { evaluateProductForStep, evaluateRoutine } from '@/features/evaluation/scoring';
import type { FRDefinition, Product, Routine, RoutineStep } from '@/types/domain';

const FR_SLIP: FRDefinition = {
  frId: 'FR05',
  name: 'provides_slip_for_detangling',
  definition: 'Reduces friction between strands enough to ease detangling.',
  applicableStepTypes: ['detangle'],
};

const FR_SEAL: FRDefinition = {
  frId: 'FR09',
  name: 'seals_and_retains_moisture',
  definition: 'Forms a light film or seal that helps retain moisture.',
  applicableStepTypes: ['leave_in'],
};

function step(overrides: Partial<RoutineStep> = {}): RoutineStep {
  return {
    id: 'step_1',
    sequence: 1,
    stepType: 'detangle',
    requirementLevel: 'required',
    assignedProductIds: [],
    ...overrides,
  };
}

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: 'prod_1',
    name: 'Test Product',
    brand: 'Test Brand',
    type: 'oil',
    ingredients: [],
    frCoverage: [],
    ...overrides,
  };
}

describe('evaluateProductForStep', () => {
  it('rates excellent_fit at 85+', () => {
    const result = evaluateProductForStep(
      product({ frCoverage: [{ frId: 'FR05', score: 92 }] }),
      step(),
      [FR_SLIP],
    );
    expect(result.rating).toBe('excellent_fit');
    expect(result.overallScore).toBe(92);
    expect(result.explanation.decision).toBe('retain_existing_product');
    expect(result.explanation.missingFR).toEqual([]);
  });

  it('rates good_fit between 70 and 84', () => {
    const result = evaluateProductForStep(
      product({ frCoverage: [{ frId: 'FR05', score: 78 }] }),
      step(),
      [FR_SLIP],
    );
    expect(result.rating).toBe('good_fit');
  });

  it('rates acceptable_with_conditions between 55 and 69', () => {
    const result = evaluateProductForStep(
      product({ frCoverage: [{ frId: 'FR05', score: 60 }] }),
      step(),
      [FR_SLIP],
    );
    expect(result.rating).toBe('acceptable_with_conditions');
    expect(result.explanation.decision).toBe('replace_product');
  });

  it('rates weak_fit between 40 and 54', () => {
    const result = evaluateProductForStep(
      product({ frCoverage: [{ frId: 'FR05', score: 45 }] }),
      step(),
      [FR_SLIP],
    );
    expect(result.rating).toBe('weak_fit');
  });

  it('rates poor_fit below 40', () => {
    const result = evaluateProductForStep(
      product({ frCoverage: [{ frId: 'FR05', score: 10 }] }),
      step(),
      [FR_SLIP],
    );
    expect(result.rating).toBe('poor_fit');
  });

  it('returns unable_to_evaluate when no FR applies to the step type', () => {
    const result = evaluateProductForStep(product(), step({ stepType: 'refresh' }), [FR_SLIP]);
    expect(result.rating).toBe('unable_to_evaluate');
    expect(result.overallScore).toBeNull();
    expect(result.confidenceScore).toBeLessThan(0.5);
  });

  it('penalizes missing FR coverage and lowers confidence when a step requires multiple FRs', () => {
    const multiFRStep = step({ stepType: 'leave_in' });
    const result = evaluateProductForStep(
      product({ frCoverage: [{ frId: 'FR05', score: 90 }] }),
      multiFRStep,
      [{ ...FR_SLIP, applicableStepTypes: ['leave_in'] }, FR_SEAL],
    );
    // Only FR05 is covered; FR09 is required but missing, so the average pulls the score down.
    expect(result.explanation.matchedFR).toEqual(['FR05']);
    expect(result.explanation.missingFR).toEqual(['FR09']);
    expect(result.overallScore).toBe(45);
    expect(result.confidenceScore).toBe(0.5);
  });
});

describe('evaluateRoutine', () => {
  const detangleStep = step({ id: 'step_detangle', assignedProductIds: ['prod_1'] });
  const cleanseStepMissing = step({
    id: 'step_cleanse',
    stepType: 'cleanse',
    requirementLevel: 'required',
    assignedProductIds: [],
  });
  const optionalStepMissing = step({
    id: 'step_refresh',
    stepType: 'refresh',
    requirementLevel: 'optional',
    assignedProductIds: [],
  });

  const routine: Routine = {
    id: 'routine_1',
    name: 'Test Routine',
    targetStyleId: 'style_1',
    status: 'active',
    washCycleDays: 7,
    steps: [detangleStep, cleanseStepMissing, optionalStepMissing],
  };

  it('flags required steps with no assigned product as missing, but not optional ones', () => {
    const result = evaluateRoutine(
      routine,
      [product({ frCoverage: [{ frId: 'FR05', score: 90 }] })],
      [FR_SLIP],
    );
    expect(result.missingSteps).toEqual([{ stepType: 'cleanse', requirementLevel: 'required' }]);
  });

  it('evaluates each assigned product per step', () => {
    const result = evaluateRoutine(
      routine,
      [product({ frCoverage: [{ frId: 'FR05', score: 90 }] })],
      [FR_SLIP],
    );
    const detangleEval = result.stepEvaluations.find((s) => s.stepId === 'step_detangle');
    expect(detangleEval?.productEvaluations).toHaveLength(1);
    expect(detangleEval?.productEvaluations[0].evaluation.rating).toBe('excellent_fit');
  });

  it('returns unable_to_evaluate when an assigned product is missing from the catalog', () => {
    const result = evaluateRoutine(routine, [], [FR_SLIP]);
    const detangleEval = result.stepEvaluations.find((s) => s.stepId === 'step_detangle');
    expect(detangleEval?.productEvaluations[0].evaluation.rating).toBe('unable_to_evaluate');
  });
});
