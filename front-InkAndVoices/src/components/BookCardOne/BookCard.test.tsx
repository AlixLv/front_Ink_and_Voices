import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { Theme } from '../../types/Book';
import BookCard from './BookCard';

vi.mock('../ThemeButton/ThemeButton', () => ({
  default: ({ theme }: { theme: Theme }) => (
    <div data-testid="theme-button">{theme.theme_name}</div>
  )
}));

describe('BookCard Component', () => {
  const mockBook = {
    uuid: '1',
    title: 'Hasta Fuego',
    author: 'Marta Randomski',
    genre: 'Drame',
    themes: [{ id: 1, theme_name: 'Roman' }] as Theme[],
    description: 'Une drôle de péripétie en autarcie.',
  };

  it('should display correct datas', () => {

    const { container } = render(<BrowserRouter><BookCard book={mockBook} /></BrowserRouter>);
    const titleElement = container.querySelector('.book-title');
    const authorElement = container.querySelector('.book-author');

    expect(titleElement?.textContent).toBe('Hasta Fuego');
    expect(authorElement?.textContent).toBe('Marta Randomski');

    });
  it('should display correct icons and tags', () => {
    render(<BrowserRouter><BookCard book={mockBook} /></BrowserRouter>);
    
    const genreImg = screen.getByAltText('icône Drame');
    expect(genreImg).toBeInTheDocument();
    expect(screen.getByText('Roman')).toBeInTheDocument();
  });
});
