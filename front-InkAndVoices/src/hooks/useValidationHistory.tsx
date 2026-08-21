import { useEffect, useState } from 'react';
import type { ValidationHistoryItem } from '../types/Book';
import { getValidationHistory } from '../services/BookService';
import { HttpError } from '../services/HttpError';

export const useValidationHistory = () => {
    const [validations, setValidations] = useState<ValidationHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        getValidationHistory()
            .then((data) => {
                if (isMounted) setValidations(data);
            })
            .catch((e) => {
                if (!isMounted) return;
                if (e instanceof HttpError && e.status === 403) {
                    setError('Accès réservé aux administrateurices.');
                } else {
                    setError("Impossible de charger l'historique des validations.");
                }
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    return { validations, isLoading, error };
};
