// src/components/BooksList.tsx
import BookCard from '../BookCard/BookCard';
import './BooksList.css';
import { useBooks } from '../../hooks/useBooks';

export default function BooksList() {
  const {books, isLoading, error} = useBooks();
  
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (books.length === 0) return <p>Aucun livre disponible pour le moment.</p>;
  
  return (
    <div className="recent-books-container">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}