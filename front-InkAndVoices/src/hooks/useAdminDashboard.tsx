import { useEffect, useState } from 'react';
import type { AdminBook } from '../types/Book';
import { getBooksByStatus } from '../services/AdminService';
import { HttpError } from '../services/HttpError';

export function useAdminDashboard() {
  const [pending, setPending] = useState<AdminBook[]>([]);
  const [validated, setValidated] = useState<AdminBook[]>([]);
  const [refused, setRefused] = useState<AdminBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [pendingData, validatedData, refusedData] = await Promise.all([
          getBooksByStatus('pending'),
          getBooksByStatus('validated'),
          getBooksByStatus('refused'),
        ]);
        if (isMounted) {
          setPending(pendingData);
          setValidated(validatedData);
          setRefused(refusedData);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof HttpError) {
            setError(err.message);
          } else {
            setError('Impossible de contacter le serveur. Vérifiez votre connexion');
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAll();

    return () => { isMounted = false; };
  }, []);

  return { pending, validated, refused, isLoading, error };
}
