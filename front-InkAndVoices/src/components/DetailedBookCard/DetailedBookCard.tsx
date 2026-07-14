import type { BookDetailsCardProps } from '../../types/Book';
import { useSingleBook } from '../../hooks/useSingleBook';
import './DetailedBookCard.css';

export default function DetailedBookCard({ id }: BookDetailsCardProps) {
  const { book, isLoading, error } = useSingleBook(id);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (!book) return null;

  return (
    <div className="detailed-book-card">
      <div className="detailed-book-header">
        <h2 className="detailed-book-title">{book.title}</h2>
        <h3 className="detailed-book-author">{book.author}</h3>
      </div>
      <div className="detailed-book-body">
        <div className="detail-row">
          <p className="detail-label">Thème</p>
          <div className="detail-themes">
            {book.themes.map((theme) => (
              <p className="detail-value" key={theme.id}>{theme.theme_name}</p>
            ))}
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