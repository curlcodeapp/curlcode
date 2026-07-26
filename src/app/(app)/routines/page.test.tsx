import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const getActiveRoutine = vi.fn();

vi.mock('@/features/routines/data', () => ({
  getActiveRoutine: () => getActiveRoutine(),
}));

vi.mock('@/features/routines/actions', () => ({
  activateRoutineTemplate: vi.fn(),
}));

import RoutinesPage from '@/app/(app)/routines/page';
import { mockRoutine } from '@/lib/mock-data';

describe('RoutinesPage', () => {
  beforeEach(() => {
    getActiveRoutine.mockReset();
  });

  it('prompts to activate the template routine when none is active', async () => {
    getActiveRoutine.mockResolvedValue(null);
    render(await RoutinesPage());
    expect(screen.getByRole('button', { name: 'Activate this routine' })).toBeInTheDocument();
  });

  it('renders the active routine name and every step type', async () => {
    getActiveRoutine.mockResolvedValue(mockRoutine);
    render(await RoutinesPage());
    expect(screen.getByText(mockRoutine.name)).toBeInTheDocument();
    for (const step of mockRoutine.steps) {
      const stepLabel = `${step.sequence}. ${step.stepType.replace('_', ' ')}`;
      expect(screen.getByText(stepLabel)).toBeInTheDocument();
    }
  });
});
