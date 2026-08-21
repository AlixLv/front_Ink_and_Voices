import { useEffect, useState } from 'react';
import type { Contribution } from '../types/Book';
import { getMyContributions, deleteBook } from '../services/BookService';
import { HttpError } from '../services/HttpError';

export const useMyContributions = () => {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        getMyContributions()
            .then((data) => {
                if (isMounted) setContributions(data);
            })
            .catch((e) => {
                if (!isMounted) return;
                if (e instanceof HttpError) {
                    setError(e.message);
                } else {
                    setError('Impossible de contacter le serveur. Vérifiez votre connexion');
                }
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    const [withdrawingId, setWithdrawingId] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const withdraw = async (id: number) => {
        setWithdrawingId(id);
        setFeedback(null);
        try {
            await deleteBook(id);
            setContributions((current) => current.filter((c) => c.id !== id));
            setFeedback('Suggestion retirée.');
        } catch {
            setFeedback("Le retrait a échoué. Réessayez.");
        } finally {
            setWithdrawingId(null);
        }
    };

    return { contributions, isLoading, error, withdraw, withdrawingId, feedback };
};
