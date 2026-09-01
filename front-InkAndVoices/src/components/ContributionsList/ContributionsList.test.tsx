import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContributionsList from './ContributionsList';

const mockUseMyBooks = vi.fn();
vi.mock('../../hooks/useMyBooks', () => ({
  useMyBooks: () => mockUseMyBooks(),
}));

vi.mock('../ContributionCard/ContributionCard', () => ({
  default: ({ book }: { book: any }) => (
    <div data-testid={`contribution-card-${book.id}`}>{book.title}</div>
  ),
}));

describe('ContributionsList Component', () => {
  it('shows a loading indicator while fetching', () => {
    mockUseMyBooks.mockReturnValue({ books: [], isLoading: true, error: null });

    render(<ContributionsList />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message when the fetch fails', () => {
    mockUseMyBooks.mockReturnValue({ books: [], isLoading: false, error: 'Erreur réseau' });

    render(<ContributionsList />);

    expect(screen.getByRole('alert')).toHaveTextContent('Erreur réseau');
  });

  it('shows the empty-state message when there are no contributions', () => {
    mockUseMyBooks.mockReturnValue({ books: [], isLoading: false, error: null });

    render(<ContributionsList />);

    expect(screen.getByText(/Aucune contribution pour le moment/)).toBeInTheDocument();
  });

  it('renders a ContributionCard per book', () => {
    mockUseMyBooks.mockReturnValue({
      books: [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
      ],
      isLoading: false,
      error: null,
    });

    render(<ContributionsList />);

    expect(screen.getByTestId('contribution-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('contribution-card-2')).toBeInTheDocument();
    expect(screen.queryByText(/Aucune contribution pour le moment/)).not.toBeInTheDocument();
  });
});
