import { describe, expect, it } from 'vitest';

import { deriveRecommendations } from '@/features/recommendations/derive';
import type { Override } from '@/features/recommendations/types';
import type { RoutineEvaluation } from '@/features/evaluation/types';
import type { Routine } from '@/types/domain';

const routine: Routine = {
  id: 'routine_1',
  name: 'Test Routine',
  targetStyleId: 'style_1',
  status: 'active',
  washCycleDays: 7,
  steps: [
    {
      id: 'step_cleanse',
      sequence: 1,
      stepType: 'cleanse',
      requirementLevel: 'required',
      assignedProductIds: [],
    },
    {
      id: 'step_define',
      sequence: 2,
      stepType: 'define',
      requirementLevel: 'required',
      assignedProductIds: ['prod_mismatched'],
    },
    {
      id: 'step_detangle',
      sequence: 3,
      stepType: 'detangle',
      requirementLevel: 'required',
      assignedProductIds: ['prod_good'],
    },
  ],
};

const evaluation: RoutineEvaluation = {
  routineId: 'routine_1',
  missingSteps: [{ stepType: 'cleanse', requirementLevel: 'required' }],
  stepEvaluations: [
    {
      stepId: 'step_define',
      stepType: 'define',
      productEvaluations: [
        {
          productId: 'prod_mismatched',
          evaluation: {
            overallScore: 0,
            frCoverageScore: 0,
            confidenceScore: 0.5,
            rating: 'poor_fit',
            explanation: {
              decision: 'replace_product',
              summary: 'Covers 0 of 1 functional requirement(s) for this step.',
              supportingFactors: [],
              limitingFactors: ['Missing coverage for provides hold without flaking'],
              matchedFR: [],
              missingFR: ['FR14'],
              confidence: 0.5,
              userVisibleMessage:
                'This product may not fully provide hold — consider an alternative.',
            },
          },
        },
      ],
    },
    {
      stepId: 'step_detangle',
      stepType: 'detangle',
      productEvaluations: [
        {
          productId: 'prod_good',
          evaluation: {
            overallScore: 90,
            frCoverageScore: 90,
            confidenceScore: 0.8,
            rating: 'excellent_fit',
            explanation: {
              decision: 'retain_existing_product',
              summary: 'Covers all 1 functional requirement(s) for this step.',
              supportingFactors: [],
              limitingFactors: [],
              matchedFR: ['FR05'],
              missingFR: [],
              confidence: 0.8,
              userVisibleMessage: 'This product is a good match for this step — no changes needed.',
            },
          },
        },
      ],
    },
  ],
};

describe('deriveRecommendations', () => {
  it('produces a missing-step and a poor-fit recommendation, but nothing for excellent fits', () => {
    const result = deriveRecommendations(routine, evaluation, []);
    expect(result).toHaveLength(2);
    expect(result.find((r) => r.source === 'missing_step')?.routineStepId).toBe('step_cleanse');
    expect(result.find((r) => r.source === 'poor_fit_product')?.routineStepId).toBe('step_define');
  });

  it('suppresses the missing-step recommendation once overridden', () => {
    const overrides: Override[] = [
      {
        id: 'override_1',
        routineStepId: 'step_cleanse',
        productId: null,
        systemDecision: 'add_step',
        userDecision: 'dismissed',
      },
    ];
    const result = deriveRecommendations(routine, evaluation, overrides);
    expect(result.some((r) => r.source === 'missing_step')).toBe(false);
    expect(result).toHaveLength(1);
  });

  it('suppresses the poor-fit recommendation once overridden', () => {
    const overrides: Override[] = [
      {
        id: 'override_2',
        routineStepId: 'step_define',
        productId: 'prod_mismatched',
        systemDecision: 'replace_product',
        userDecision: 'retain_product',
      },
    ];
    const result = deriveRecommendations(routine, evaluation, overrides);
    expect(result.some((r) => r.source === 'poor_fit_product')).toBe(false);
    expect(result).toHaveLength(1);
  });
});
