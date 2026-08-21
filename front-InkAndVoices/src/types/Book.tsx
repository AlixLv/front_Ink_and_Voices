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
  resume?: string | null;
  reference_link?: string | null;
  short_description: string;
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

export interface BookFilters {
  search?: string;
  type_id?: number;
  theme_id?: number;
}

export interface Contribution {
  id: number;
  title: string;
  author: string;
  short_description: string;
  status: 'pending' | 'validated' | 'refused';
  created_at: string;
  type: {
    id: number;
    type_name: string;
  };
  validation_comment: string | null;
}

export interface ValidationHistoryItem {
  id: number;
  status: 'pending' | 'validated' | 'refused';
  comment: string | null;
  validation_date: string;
  book: {
    id: number;
    title: string;
    author: string;
  };
  admin: {
    username: string;
  };
}

export interface ValidateBookInput {
  status: 'validated' | 'refused';
  comment: string | null;
}

export interface ValidateBookResponse {
  id: number;
  status: 'validated' | 'refused';
  comment: string | null;
}

export interface AddBookFormErrors {
  title?: string;
  author?: string;
  publishing_house?: string;
  short_description?: string;
  type_id?: string;
  global?: string;
}