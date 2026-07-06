// src/components/BooksList.tsx
import BookCard from '../BookCard/BookCard';
import './BooksList.css';
import { useBooks } from '../../hooks/useBooks';

export default function BooksList() {
  const books = useBooks();
  
  return (
    <div className="recent-books-container">
      {books.map(book => (
        <BookCard key={book.uuid} book={book} />
      ))}
    </div>
  );
}