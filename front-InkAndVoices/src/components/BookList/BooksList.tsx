// src/components/BooksList.tsx
import BookCard from '../BookCard/BookCard';
import './BooksList.css';
import { useBooks } from '../../hooks/useBooks';
import type { BookFilters } from '../../types/Book';

export default function BooksList({ filters }: { filters?: BookFilters }) {
  const {books, isLoading, error, page, setPage, pageCount, total} = useBooks(filters);

  if (isLoading) return <p role="status">Chargement...</p>;
  if (error) return <p role="alert">Erreur : {error}</p>;
  if (!books?.length) {
    return (
      <div className="empty-state">
        <img src="/minilogo.svg" alt="" />
        <p>Aucun livre disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <>
      {total > 0 && (
        <p className="books-count" aria-live="polite">
          {total} livre{total > 1 ? 's' : ''}
        </p>
      )}
      <div className="recent-books-container">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {pageCount > 1 && (
        <nav className="books-pagination" aria-label="Pagination des livres">
          <button
            type="button"
            className="books-pagination-button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Page précédente
          </button>
          <p className="books-pagination-status" aria-live="polite">
            Page {page} sur {pageCount}
          </p>
          <button
            type="button"
            className="books-pagination-button"
            disabled={page >= pageCount}
            onClick={() => setPage(page + 1)}
          >
            Page suivante
          </button>
        </nav>
      )}
    </>
  );
}
