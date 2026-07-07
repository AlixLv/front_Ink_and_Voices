export interface Book {
  uuid: string;
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
