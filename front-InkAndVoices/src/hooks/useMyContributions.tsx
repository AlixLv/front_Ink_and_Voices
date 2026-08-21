import { useEffect, useState } from 'react';
import type { Contribution } from '../types/Book';
import { getMyContributions } from '../services/BookService';
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

    return { contributions, isLoading, error };
};
