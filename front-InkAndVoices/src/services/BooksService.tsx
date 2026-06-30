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
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    description: 'Une épopée fantastique incontournable',
  },
  {
    uuid: '2',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopie',
    description: 'Un roman d\'anticipation sombre et captivant',
  },
  {
    uuid: '3',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Conte',
    description: 'Un conte philosophique et poétique',
  },
  {
    uuid: '4',
    title: 'Orgueil et Préjugés',
    author: 'Jane Austen',
    genre: 'Romance',
    description: 'Un classique de la littérature anglaise',
  },
  {
    uuid: '5',
    title: 'Les Misérables',
    author: 'Victor Hugo',
    genre: 'Drame',
    description: 'L\'histoire de Jean Valjean et de la France révolutionnaire',
  },
];

export const getBooks = async (): Promise<Book[]> => {
  // Simule un appel API avec un délai
  return new Promise((resolve) => {
    setTimeout(() => resolve(BOOKS_DATA), 500);
  });
};