import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/assessment/data', () => ({
  getHairProfile: vi.fn().mockResolvedValue({
    id: 'profile_test',
    curlPattern: '3B',
    density: 'medium',
    porosity: 'high',
    thickness: 'medium',
    scalpType: 'dry',
    goal: 'Reduce frizz and improve curl definition',
  }),
}));

vi.mock('@/features/routines/data', () => ({
  getActiveRoutine: vi.fn().mockResolvedValue({
    id: 'routine_test',
    name: 'Weekly Wash & Go',
    targetStyleId: 'style_wash_and_go',
    status: 'active',
    washCycleDays: 7,
    steps: [
      {
        id: 'step_1',
        sequence: 1,
        stepType: 'cleanse',
        requirementLevel: 'required',
        assignedProductIds: [],
      },
    ],
  }),
}));

import TodayPage from '@/app/(app)/today/page';

describe('TodayPage', () => {
  it('renders the hair summary and today’s routine', async () => {
    render(await TodayPage());
    expect(screen.getByText('Hair summary')).toBeInTheDocument();
    expect(screen.getByText('Weekly Wash & Go')).toBeInTheDocument();
  });
});
