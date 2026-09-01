import { useEffect, useState } from 'react';
import { getMyBooks } from '../services/BookService';
import type { MyBook } from '../types/Book';
import { HttpError } from '../services/HttpError';

export function useMyBooks() {
  const [books, setBooks] = useState<MyBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMyBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const booksData = await getMyBooks();
        if (isMounted) {
          setBooks(booksData);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof HttpError) {
            setError(err.message);
          } else {
            setError('Impossible de contacter le serveur. Vérifiez votre connexion');
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMyBooks();

    return () => { isMounted = false; };
  }, []);

  return { books, isLoading, error };
}
