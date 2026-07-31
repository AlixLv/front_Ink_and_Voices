// useBooks.ts
import { useEffect, useState } from 'react';
import { getBooks } from '../services/BookService';
import type { Book } from '../types/Book';
import { HttpError } from '../services/HttpError';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async() => {
      setIsLoading(true);
      setError(null);

      try {
        const booksData = await getBooks();
        if (isMounted){
          setBooks(booksData);
        }
      } catch (error){
        if (isMounted){
          if (error instanceof HttpError){
            setError(error.message);
          } else {
            setError('Impossible de contacter le serveur. Vérifiez votre connexion')
          }
        }
      } finally {
        if (isMounted){
          setIsLoading(false);
        }
      }
    };
    
    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, []);
  
  return {books, isLoading, error};
}