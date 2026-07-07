
import type { Book } from '../types/Book';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';
export const getBooks = async(): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_URL}/api/books`, { method: 'GET' });
    if(!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch(error) {
    console.error("Erreur lors de la récupération de l'ensemble des livres", error)
    return [];
  }
}
