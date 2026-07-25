import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductsPage from '@/app/(app)/products/page';
import { mockProducts } from '@/lib/mock-data';

describe('ProductsPage', () => {
  it('renders every mock product', () => {
    render(<ProductsPage />);
    for (const product of mockProducts) {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    }
  });
});
