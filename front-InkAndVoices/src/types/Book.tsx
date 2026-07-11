export interface Theme {
  id: number;
  theme_name: string;
}

export interface Type {
  id: number;
  type_name: string;
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