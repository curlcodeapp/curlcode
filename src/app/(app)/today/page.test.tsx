import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import TodayPage from '@/app/(app)/today/page';

describe('TodayPage', () => {
  it('renders the hair summary and today’s routine', () => {
    render(<TodayPage />);
    expect(screen.getByText('Hair summary')).toBeInTheDocument();
    expect(screen.getByText('Weekly Wash & Go')).toBeInTheDocument();
  });
});
