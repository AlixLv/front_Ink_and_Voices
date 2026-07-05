export interface Theme {
  id: number;
  theme_name: string;
}

export interface Book {
  uuid: string;
  title: string;
  author: string;
  genre: string;
  themes: Theme[];
  description: string;
}

export interface BookCardProps {
  book: Book;
}

export interface BooksListProps {
  books: Book[];
}
