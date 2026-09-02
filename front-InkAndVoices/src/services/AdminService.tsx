import type { AdminBook, Book, BookStatus, BookValidationStatus } from '../types/Book';
import { HttpError } from './HttpError';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

// Routes protégées (authenticate + requireAdmin côté backend) : credentials
// 'include' pour que le cookie httpOnly parte avec la requête.
export const getBooksByStatus = async(status: BookStatus): Promise<AdminBook[]> => {
  const response = await fetch(`${API_URL}/api/admin/books?status=${status}`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}

export const validateBook = async(
  id: number,
  status: BookValidationStatus
): Promise<Book> => {
  const response = await fetch(`${API_URL}/api/admin/books/${id}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ status }),
  });
  const data = await response.json().catch(() => ({}));

  if(!response.ok) {
    throw new HttpError(response.status, data);
  }
  return data;
}
