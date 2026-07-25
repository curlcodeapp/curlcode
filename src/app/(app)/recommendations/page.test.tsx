import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RecommendationsPage from '@/app/(app)/recommendations/page';
import { mockRecommendations } from '@/lib/mock-data';

describe('RecommendationsPage', () => {
  it('renders every mock recommendation summary', () => {
    render(<RecommendationsPage />);
    for (const recommendation of mockRecommendations) {
      expect(screen.getByText(recommendation.summary)).toBeInTheDocument();
    }
  });
});
