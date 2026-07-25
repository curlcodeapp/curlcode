import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/today',
}));

import { BottomNav } from '@/components/BottomNav';

describe('BottomNav', () => {
  it('renders a link for every primary section', () => {
    render(<BottomNav />);
    for (const label of ['Today', 'Products', 'Routines', 'Recs', 'Profile']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('marks the current route as active', () => {
    render(<BottomNav />);
    expect(screen.getByRole('link', { name: 'Today' })).toHaveAttribute('aria-current', 'page');
  });
});
