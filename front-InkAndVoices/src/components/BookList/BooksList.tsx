// src/components/BooksList.tsx
import BookCard from '../BookCardOne/BookCard';
import './BooksList.css';

interface Book {
  uuid: string;
  title: string;
  author: string;
  genre: string;
  description: string;
}

interface BooksListProps {
  books: Book[];
}

export default function BooksList({ books }: BooksListProps) {
  return (
    <div className="recent-books-container">
      {books.map(book => (
        <BookCard key={book.uuid} book={book} />
      ))}
    </div>
  );
}