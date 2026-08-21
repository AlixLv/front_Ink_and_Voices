import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePendingBooks } from '../../hooks/usePendingBooks';
import BackButton from '../../components/BackButton/BackButton';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import type { Book } from '../../types/Book';
import styles from './admin.module.css';

function PendingBookCard({
    book,
    isProcessing,
    onReview,
}: {
    book: Book;
    isProcessing: boolean;
    onReview: (id: number, status: 'validated' | 'refused', comment: string) => void;
}) {
    const [comment, setComment] = useState<string>('');

    return (
        <li className={styles.bookCard}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookMeta}>
                {book.author} · {book.publishing_house}
                {book.publication_year ? ` · ${book.publication_year}` : ''}
            </p>
            <p className={styles.bookMeta}>Genre : {book.type.type_name}</p>
            {book.themes.length > 0 && (
                <p className={styles.bookMeta}>
                    Thèmes : {book.themes.map((theme) => theme.theme_name).join(', ')}
                </p>
            )}
            <p className={styles.bookMeta}>{book.short_description}</p>
            <label className={styles.commentLabel}>
                Commentaire (facultatif)
                <textarea
                    className={styles.commentField}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={isProcessing}
                />
            </label>
            <div className={styles.actions}>
                <SubmitButton
                    text={isProcessing ? 'Envoi…' : 'Valider'}
                    disabled={isProcessing}
                    onClick={() => onReview(book.id, 'validated', comment)}
                />
                <SubmitButton
                    text={isProcessing ? 'Envoi…' : 'Refuser'}
                    disabled={isProcessing}
                    onClick={() => onReview(book.id, 'refused', comment)}
                />
            </div>
        </li>
    );
}

export default function AdminReviews() {
    const { isAuthenticated, isAdmin, isLoading: isAuthLoading } = useAuth();
    const { books, isLoading, error, processingId, feedback, review } = usePendingBooks();

    if (isAuthLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login-required" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className={styles.page}>
            <BackButton />
            <h1 className={styles.title}>Livres en attente de validation</h1>
            <p aria-live="polite" role="status" className={styles.feedback}>
                {feedback}
            </p>
            {isLoading && <p>Chargement des livres en attente…</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!isLoading && !error && books.length === 0 && (
                <p>Aucun livre en attente. Tout est à jour !</p>
            )}
            {books.length > 0 && (
                <ul className={styles.bookList}>
                    {books.map((book) => (
                        <PendingBookCard
                            key={book.id}
                            book={book}
                            isProcessing={processingId === book.id}
                            onReview={review}
                        />
                    ))}
                </ul>
            )}
        </main>
    );
}
