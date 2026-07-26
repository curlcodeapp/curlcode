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

vi.mock('@/features/auth/actions', () => ({
  signOut: vi.fn(),
}));

import ProfilePage from '@/app/(app)/profile/page';

describe('ProfilePage', () => {
  it('renders the hair profile form pre-filled with the saved profile', async () => {
    render(await ProfilePage());
    expect(screen.getByDisplayValue('3B')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('Reduce frizz and improve curl definition'),
    ).toBeInTheDocument();
  });
});
