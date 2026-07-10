export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  theme: string;
  description: string;
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