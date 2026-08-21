// useBooks.ts
import { useEffect, useState } from 'react';
import { getBooks } from '../services/BookService';
import type { Book, BookFilters } from '../types/Book';
import { HttpError } from '../services/HttpError';

export function useBooks(filters?: BookFilters) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setPage(1);
  }, [filters?.search, filters?.type_id, filters?.theme_id]);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async() => {
      setIsLoading(true);
      setError(null);

      try {
        const booksData = await getBooks(filters, page);
        if (isMounted){
          setBooks(booksData.items);
          setPageCount(booksData.page_count);
          setTotal(booksData.total);
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
  }, [filters?.search, filters?.type_id, filters?.theme_id, page]);

  return {books, isLoading, error, page, setPage, pageCount, total};
}
