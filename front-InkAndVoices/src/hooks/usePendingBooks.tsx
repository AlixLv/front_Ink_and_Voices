import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { getPendingBooks, validateBook } from '../services/BookService';
import { HttpError } from '../services/HttpError';

export const usePendingBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        getPendingBooks()
            .then((data) => {
                if (isMounted) setBooks(data);
            })
            .catch((e) => {
                if (!isMounted) return;
                if (e instanceof HttpError && e.status === 403) {
                    setError("Accès réservé aux administrateurices.");
                } else {
                    setError('Impossible de charger les livres en attente.');
                }
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    const review = async (id: number, status: 'validated' | 'refused', comment: string) => {
        setProcessingId(id);
        setFeedback(null);
        try {
            await validateBook(id, { status, comment: comment.trim() === '' ? null : comment.trim() });
            setBooks((current) => current.filter((book) => book.id !== id));
            setFeedback(status === 'validated' ? 'Livre validé.' : 'Livre refusé.');
        } catch {
            setFeedback("La décision n'a pas pu être enregistrée. Réessayez.");
        } finally {
            setProcessingId(null);
        }
    };

    return { books, isLoading, error, processingId, feedback, review };
};
