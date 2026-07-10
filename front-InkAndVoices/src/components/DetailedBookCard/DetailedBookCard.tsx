import type { BookDetailsCardProps } from '../../types/Book';
import { useSingleBook } from '../../hooks/useSingleBook';

export default function DetailedBookCard({ id }: BookDetailsCardProps){
    const { book, isLoading, error } = useSingleBook(id);

    if(isLoading) return <p>Chargement...</p>;
    if(error) return <p>Erreur: {error}</p>;
    if(!book) return null; 

    return (
        <div className="detailed-book-card">
            <div className="detailed-book-header">
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
            </div>
            <div className="detailed-book-body">
                <p>Thème</p>
                <p>{book.theme}</p>
                <p>Maison d'édition</p>
                <p>Type d'ouvrage</p>
                <p>{book.genre}</p>
                <p>Année de publication</p>
                <p>Description</p>
                <p>{book.description}</p>
            </div>

            
        </div>
    )
}