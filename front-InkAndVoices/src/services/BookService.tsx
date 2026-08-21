import type { Book, BookFilters, Contribution, CreateBookInput, PaginatedBooks, Theme, Type, ValidateBookInput, ValidateBookResponse, ValidationHistoryItem } from '../types/Book';
import { HttpError } from './HttpError';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const getBooks = async(filters?: BookFilters, page?: number): Promise<PaginatedBooks> => {
  const params = new URLSearchParams();
  if (filters?.search) params.set('search', filters.search);
  if (filters?.type_id) params.set('type_id', String(filters.type_id));
  if (filters?.theme_id) params.set('theme_id', String(filters.theme_id));
  if (page && page > 1) params.set('page', String(page));
  const query = params.toString();

  const response = await fetch(`${API_URL}/api/books${query ? `?${query}` : ''}`, { method: 'GET' });
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

export const getMyContributions = async(): Promise<Contribution[]> => {
  const response = await fetch(`${API_URL}/api/books/mine`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

export const getValidationHistory = async(): Promise<ValidationHistoryItem[]> => {
  const response = await fetch(`${API_URL}/api/books/validations`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

export const updateBook = async(id: number, input: CreateBookInput): Promise<Book> => {
  const response = await fetch(`${API_URL}/api/books/${id}`, {
    method: 'PUT',
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

export const deleteBook = async(id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/books/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
}

export const createType = async(typeName: string): Promise<Type> => {
  const response = await fetch(`${API_URL}/api/types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ type_name: typeName }),
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

export const createTheme = async(themeName: string): Promise<Theme> => {
  const response = await fetch(`${API_URL}/api/themes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ theme_name: themeName }),
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}
