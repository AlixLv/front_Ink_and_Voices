import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContributionCard from './ContributionCard';
import type { MyBook } from '../../types/Book';

const baseBook: MyBook = {
  id: 1,
  title: 'La Bâtarde',
  author: 'Violette Leduc',
  type: { id: 1, type_name: 'Roman' },
  themes: [],
  short_description: 'desc',
  created_at: '2026-01-15T00:00:00.000Z',
  status: 'pending',
};

describe('ContributionCard Component', () => {
  it('displays the title, author and submission date', () => {
    render(<ContributionCard book={baseBook} />);

    expect(screen.getByText('La Bâtarde')).toBeInTheDocument();
    expect(screen.getByText('Violette Leduc')).toBeInTheDocument();
    expect(screen.getByText(/Soumis le/)).toBeInTheDocument();
  });

  it.each([
    ['pending', 'En attente'],
    ['validated', 'Accepté'],
    ['refused', 'Refusé'],
  ] as const)('shows "%s" status as "%s"', (status, label) => {
    render(<ContributionCard book={{ ...baseBook, status }} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
