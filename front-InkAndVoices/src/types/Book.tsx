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

export interface BooksListProps {
  books: Book[];
}
