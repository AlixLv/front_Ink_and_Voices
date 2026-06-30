// src/containers/BooksContainer.tsx

import { useEffect, useState } from 'react';
import { getBooks } from '../services/BooksService.tsx';
import BooksList from '../components/BooksList.tsx';

interface Book {
  uuid: string;
  title: string;
  author: string;
  genre: string;
  description: string;
}

export default function BooksContainer() {
  const [books, setBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    getBooks().then(setBooks);
  }, []);
  
  return <BooksList books={books} />;
}