// useEffect() permet d'éexecuter du code à chaque fois qu'un element est affiché.
// useState() permet de changer la valeur d'une variable quand on veut (on lui créé un setter immédiat)


import { useEffect, useState } from 'react';
import { getBooks } from '../services/BooksService';
import type { Book } from '../types/Book';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]); //la valeur de books est, au début, un tableau vide qui ne peut recevoir que des livres (type Book). Si on appelle setBooks(nouvelle valeur), books se mettra à jour.
  
  useEffect(() => {
    getBooks().then(setBooks);
  }, []);
  
  return books;
}