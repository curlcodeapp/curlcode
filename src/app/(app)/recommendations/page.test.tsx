import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const getRoutineRecommendations = vi.fn();

vi.mock('@/features/recommendations/data', () => ({
  getRoutineRecommendations: () => getRoutineRecommendations(),
}));

vi.mock('@/features/recommendations/actions', () => ({
  recordOverride: vi.fn(),
  undoOverride: vi.fn(),
}));

import RecommendationsPage from '@/app/(app)/recommendations/page';

const baseRoutine = {
  id: 'routine_1',
  name: 'Weekly Wash & Go',
  targetStyleId: 'style_1',
  status: 'active' as const,
  washCycleDays: 7,
  steps: [],
};

describe('RecommendationsPage', () => {
  beforeEach(() => {
    getRoutineRecommendations.mockReset();
  });

  it('prompts to activate a routine when none is active', async () => {
    getRoutineRecommendations.mockResolvedValue(null);
    render(await RecommendationsPage());
    expect(
      screen.getByText('Activate a routine to get personalized recommendations.'),
    ).toBeInTheDocument();
  });

  it('shows an all-clear message when there are no live recommendations', async () => {
    getRoutineRecommendations.mockResolvedValue({
      routine: baseRoutine,
      evaluation: { routineId: 'routine_1', stepEvaluations: [], missingSteps: [] },
      overrides: [],
      recommendations: [],
    });
    render(await RecommendationsPage());
    expect(screen.getByText("You're all set — no recommendations right now.")).toBeInTheDocument();
  });

  it('renders a poor-fit recommendation with Keep it anyway and Dismiss actions', async () => {
    getRoutineRecommendations.mockResolvedValue({
      routine: baseRoutine,
      evaluation: { routineId: 'routine_1', stepEvaluations: [], missingSteps: [] },
      overrides: [],
      recommendations: [
        {
          id: 'step_define:prod_thedoux_texture_foam',
          source: 'poor_fit_product',
          routineStepId: 'step_define',
          productId: 'prod_thedoux_texture_foam',
          stepType: 'define',
          summary: 'Consider replacing your define product',
          whyThisHelps: 'This product may not fully provide hold — consider an alternative.',
          rating: 'poor_fit',
        },
      ],
    });
    render(await RecommendationsPage());
    expect(screen.getByText('Consider replacing your define product')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Keep it anyway' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('renders a missing-step recommendation with only a Dismiss action', async () => {
    getRoutineRecommendations.mockResolvedValue({
      routine: baseRoutine,
      evaluation: { routineId: 'routine_1', stepEvaluations: [], missingSteps: [] },
      overrides: [],
      recommendations: [
        {
          id: 'step_cleanse:missing',
          source: 'missing_step',
          routineStepId: 'step_cleanse',
          productId: null,
          stepType: 'cleanse',
          summary: 'Add a cleanse step',
          whyThisHelps:
            'This routine expects a required cleanse step, but no product is assigned yet.',
        },
      ],
    });
    render(await RecommendationsPage());
    expect(screen.getByText('Add a cleanse step')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Keep it anyway' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('lists resolved overrides with an Undo action', async () => {
    getRoutineRecommendations.mockResolvedValue({
      routine: baseRoutine,
      evaluation: { routineId: 'routine_1', stepEvaluations: [], missingSteps: [] },
      overrides: [
        {
          id: 'override_1',
          routineStepId: 'step_define',
          productId: 'prod_thedoux_texture_foam',
          systemDecision: 'replace_product',
          userDecision: 'retain_product',
        },
      ],
      recommendations: [],
    });
    render(await RecommendationsPage());
    expect(screen.getByText(/Def Texture Foam Mousse/)).toBeInTheDocument();
    expect(screen.getByText(/Kept/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });
});
