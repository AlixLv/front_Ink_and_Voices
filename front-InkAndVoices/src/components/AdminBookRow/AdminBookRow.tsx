import { Link } from 'react-router-dom';
import type { AdminBook } from '../../types/Book';
import styles from './AdminBookRow.module.css';

interface AdminBookRowProps {
  book: AdminBook;
}

export default function AdminBookRow({ book }: AdminBookRowProps) {
  return (
    <Link to={`/admin/books/${book.id}`} className={styles.link}>
      <div className={styles.row}>
        <div className={styles.texts}>
          <p className={styles.title}>{book.title}</p>
          <p className={styles.author}>{book.author}</p>
        </div>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </Link>
  );
}
