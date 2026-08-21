import type { BookDetailsCardProps } from '../../types/Book';
import { useSingleBook } from '../../hooks/useSingleBook';
import './DetailedBookCard.css';
import ThemeButton from '../ThemeButtons/ThemeButtons';

export default function DetailedBookCard({ id }: BookDetailsCardProps) {
  const { book, isLoading, error } = useSingleBook(id);

  if (isLoading) return <p role="status">Chargement...</p>;
  if (error) return <p role="alert">Erreur: {error}</p>;
  if (!book) return null;

  return (
    <div className="detailed-book-card">
      <div className="detailed-book-header">
        <div className={`detailed-book-cover book-cover-${book.id % 3}`} aria-hidden="true">
          <img src="/minilogo.svg" alt="" className="detailed-book-cover-icon" />
          <span className="detailed-book-cover-initial">{book.title.charAt(0).toUpperCase()}</span>
        </div>
        <div className="detailed-book-titles">
          <h2 className="detailed-book-author">{book.author}</h2>
          <h3 className="detailed-book-title">{book.title}</h3>
        </div>
      </div>
      <div className="detailed-book-body">
        <div className="detail-row">
          <p className="detail-label">Thème</p>
          <div className="detail-themes">
             <ThemeButton themes={book.themes} />
          </div>
        </div>

        <div className="detail-row">
          <p className="detail-label">Maison d'édition</p>
          <p className="detail-value">{book.publishing_house}</p>
        </div>

        <div className="detail-row">
          <p className="detail-label">Type d'ouvrage</p>
          <p className="detail-value">{book.type.type_name}</p>
        </div>

        <div className="detail-row">
          <p className="detail-label">Année de publication</p>
          <p className="detail-value">{book.publication_year}</p>
        </div>

        <div className="detail-row detail-row-description">
          <p className="detail-label">Description</p>
          <p className="detail-value detail-description">{book.short_description}</p>
        </div>
      </div>
    </div>
  );
}
