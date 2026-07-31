import type { Book } from '../types/Book';
import { HttpError } from './HttpError';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const getBooks = async(): Promise<Book[]> => {
  const response = await fetch(`${API_URL}/api/books`, { method: 'GET' });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

export const getSingleBook = async(id: number): Promise<Book> => {
  const response = await fetch(`${API_URL}/api/books/${id}`, { method: 'GET' });
  const data = await response.json().catch(() => ({}));
  
  if(!response.ok){
    throw new HttpError(response.status, data);
  }
  
  return data;
}

