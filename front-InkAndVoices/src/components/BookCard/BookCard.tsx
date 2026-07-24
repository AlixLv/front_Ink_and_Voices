import genreIcon from '../../assets/genre-icons/genre-icon.svg';
import './BookCard.css';
import ThemeButton from '../ThemeButtons/ThemeButtons.tsx';
import type { BookCardProps } from '../../types/Book.tsx';
import { Link } from 'react-router-dom';



export default function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/book/${book.id}`}>
      <div className="book-card">
        <div className="book-header">
            <h3 className="book-title">{book.title}</h3>
          <div className="genre-icon">
            <img src={genreIcon} alt={`icône ${book.type.type_name}`} />
            <p className="book-type">{book.type.type_name}</p>
          </div>
        </div>
        <div className="book-details">
          <p className="book-author">{book.author}</p>
        </div>
        <div className="theme-buttons-list">
          <ThemeButton themes={book.themes} />
        </div>
      </div>
    </Link>
  );
}
