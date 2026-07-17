import { useState, useEffect } from 'react';
import type { Book, UseSingleBookResult } from '../types/Book';
import { getSingleBook } from '../services/BooksService';


export function useSingleBook(id: number): UseSingleBookResult {
    const [book, setBook] = useState<Book>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchBook = async () => {
            setIsLoading(true);
            setError(null);
            try{
                const bookData = await getSingleBook(id);
                if (isMounted){
                    setBook(bookData);
                }
            } catch (error){
                if (isMounted){
                    setError(error instanceof Error ? error.message: 'Erreur inconnue');
                }
            } finally {
                if (isMounted){
                    setIsLoading(false);
                }
            }
        };
        
        fetchBook();

        return () => {
            isMounted = false;
        };
    }, [id]);   

    return {book, isLoading, error};
}