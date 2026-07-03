// src/components/BooksList.tsx
import BookCard from '../BookCardOne/BookCard';
import './BooksList.css';
import type { BooksListProps } from '../../types/Book.tsx';

export default function BooksList({ books }: BooksListProps) {
  return (
    <div className="recent-books-container">
      {books.map(book => (
        <BookCard key={book.uuid} book={book} />
      ))}
    </div>
  );
}