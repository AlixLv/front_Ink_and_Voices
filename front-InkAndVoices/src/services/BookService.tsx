import type { Book, CreateBookInput, Theme, Type, ValidateBookInput, ValidateBookResponse } from '../types/Book';
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

export const getTypes = async(): Promise<Type[]> => {
  const response = await fetch(`${API_URL}/api/types`, { method: 'GET' });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

export const getThemes = async(): Promise<Theme[]> => {
  const response = await fetch(`${API_URL}/api/themes`, { method: 'GET' });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

// Route protégée : credentials 'include' pour que le cookie httpOnly parte
// avec la requête (même raison que loginUser dans AuthService).
export const createBook = async(input: CreateBookInput): Promise<Book> => {
  const response = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}


export const getPendingBooks = async(): Promise<Book[]> => {
  const response = await fetch(`${API_URL}/api/books/pending`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

export const validateBook = async(id: number, input: ValidateBookInput): Promise<ValidateBookResponse> => {
  const response = await fetch(`${API_URL}/api/books/${id}/validate`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}
