// src/components/BooksList.tsx
import BookCard from '../BookCard/BookCard';
import './BooksList.css';
import { useBooks } from '../../hooks/useBooks';
import type { BookFilters } from '../../types/Book';

export default function BooksList({ filters }: { filters?: BookFilters }) {
  const {books, isLoading, error} = useBooks(filters);

  if (isLoading) return <p role="status">Chargement...</p>;
  if (error) return <p role="alert">Erreur : {error}</p>;
  if (!books?.length) return <p>Aucun livre disponible pour le moment.</p>;
  
  return (
    <div className="recent-books-container">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}