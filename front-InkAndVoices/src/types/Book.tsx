export interface Theme {
  id: number;
  theme_name: string;
}

export interface Type {
  id: number;
  type_name: string;
  url_image?: string;
}
export interface Book {
  id: number;
  title: string;
  author: string;
  type: Type;
  publishing_house?: string;
  publication_year?: string;
  themes: Theme[];
  resume?: string;
  short_description: string;
  // Déjà renvoyé par GET /api/books/:id (bookDetailSchema côté back), mais
  // absent du type jusqu'ici.
  reference_link?: string | null;
}

export interface BookCardProps {
  book: Book;
}

export interface BookDetailsCardProps {
  id: number;
}
export interface BooksListProps {
  books: Book[];
}
export interface UseSingleBookResult {
    book: Book | undefined;
    isLoading: boolean;
    error: string | null;
}

// Ce que le formulaire "proposer un livre" envoie à POST /api/books.
// Pas de status ni de user_id : gérés côté backend (cf. book.schema.ts).
export interface CreateBookInput {
  title: string;
  author: string;
  publishing_house: string;
  short_description: string;
  publication_year: string | null;
  resume: string | null;
  reference_link: string | null;
  type_id: number;
  theme_ids: number[];
}

export interface AddBookFormErrors {
  title?: string;
  author?: string;
  publishing_house?: string;
  short_description?: string;
  type_id?: string;
  global?: string;
}

// Réponse de GET /api/admin/books?status=... : un livre (quel que soit son
// statut), avec en plus l'identité de qui l'a suggéré (jamais exposé sur
// les routes publiques).
export interface AdminBook extends Book {
  created_at: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export type BookStatus = 'pending' | 'validated' | 'refused';
export type BookValidationStatus = 'validated' | 'refused';

// Réponse de GET /api/books/mine ("mes contributions", page profil) : les
// suggestions de la personne connectée, quel que soit leur statut.
export interface MyBook extends Book {
  created_at: string;
  status: BookStatus;
}