// Données statiques des livres récents
interface Book {
  uuid: string;
  title: string;
  author: string;
  genre: string;
  description: string;
}

const BOOKS_DATA: Book[] = [
  {
    uuid: '1',
    title: 'Peau noire, masques blancs',
    author: 'Frantz Fanon',
    genre: 'Essai',
    description: 'Une analyse profonde des effets du colonialisme sur l\'identité',
  },
  {
    uuid: '2',
    title: 'Métro, boulot, chimio',
    author: 'Sophie Rambert',
    genre: 'Dystopie',
    description: 'Un roman d\'anticipation sombre et captivant',
  },
  {
    uuid: '3',
    title: 'Le deuxième sexe',
    author: 'Simone de Beauvoir',
    genre: 'Essai',
    description: 'Une analyse philosophique et féministe',
  },
  {
    uuid: '4',
    title: 'No Logo',
    author: 'Naomi Klein',
    genre: 'Essai',
    description: 'Une critique des pratiques des grandes marques et de la mondialisation',
  },
];

export const getBooks = async (): Promise<Book[]> => {
  // Simule un appel API avec un délai
  return new Promise((resolve) => {
    setTimeout(() => resolve(BOOKS_DATA), 500);
  });
};