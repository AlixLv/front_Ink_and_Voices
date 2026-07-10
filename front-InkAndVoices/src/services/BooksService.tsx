import type { Book } from '../types/Book';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const getBooks = async(): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_URL}api/books`, { method: 'GET' });
    if(!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }
    const data = await response.json();
    console.log("🌈 data: ", data)
    return data;
  } catch(error) {
      console.error("Erreur lors de la récupération de l'ensemble des livres", error)
    return [];
  }
}

export const getSingleBook = async(id: number): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}api/books/${id}`, { method: 'GET' });
    if(!response.ok){
      throw new Error(`HTTP error. status: ${response.status}`);
    }
    const bookData = await response.json();
    console.log("book received 📙: ", bookData)
    return bookData;
  } catch(error){
    console.error("Erreur lors de la récupération du livre", error)
    throw error;
  }
}

