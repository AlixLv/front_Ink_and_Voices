// useBooks.ts
import { useEffect, useState } from 'react';
import { getBooks } from '../services/BooksService';
import type { Book } from '../types/Book';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    getBooks().then(setBooks);
  }, []);
  
  return books;
}