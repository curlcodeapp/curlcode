import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProfilePage from '@/app/(app)/profile/page';
import { mockHairProfile } from '@/lib/mock-data';

describe('ProfilePage', () => {
  it('renders the hair profile and goal', () => {
    render(<ProfilePage />);
    expect(screen.getByText(mockHairProfile.curlPattern)).toBeInTheDocument();
    expect(screen.getByText(mockHairProfile.goal)).toBeInTheDocument();
  });
});
