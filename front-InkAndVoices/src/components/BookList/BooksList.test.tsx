import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BooksList from './BooksList';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../hooks/useBooks', () => ({
  useBooks: () => ({
      books: [
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
      { id: 3, title: 'Book 3', author: 'Author 3' }
      ],
      isLoading: false,
      error: null
  })
}));

vi.mock('../BookCard/BookCard', () => ({
  default: ({ book }: { book: any }) => (
    <div data-testid={`book-card-${book.id}`}>{book.title}</div>
  )
}));

describe('BooksList Component', () => {
  it('should render a list of books', () => {
    render(
      <BrowserRouter>
        <BooksList />
      </BrowserRouter>
    );

    expect(screen.getByTestId('book-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('book-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('book-card-3')).toBeInTheDocument();
  });

  it('should render correct number of BookCard', () => {
    const { container } = render(
      <BrowserRouter>
        <BooksList />
      </BrowserRouter>
    );
    
    const bookCards = container.querySelectorAll('[data-testid^="book-card-"]');
    expect(bookCards.length).toBe(3);
  });
});