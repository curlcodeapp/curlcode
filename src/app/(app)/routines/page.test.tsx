import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RoutinesPage from '@/app/(app)/routines/page';
import { mockRoutine } from '@/lib/mock-data';

describe('RoutinesPage', () => {
  it('renders the routine name and every step type', () => {
    render(<RoutinesPage />);
    expect(screen.getByText(mockRoutine.name)).toBeInTheDocument();
    for (const step of mockRoutine.steps) {
      const stepLabel = `${step.sequence}. ${step.stepType.replace('_', ' ')}`;
      expect(screen.getByText(stepLabel)).toBeInTheDocument();
    }
  });
});
