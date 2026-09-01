import ContributionCard from '../ContributionCard/ContributionCard';
import { useMyBooks } from '../../hooks/useMyBooks';
import './ContributionsList.css';


export default function ContributionList() {
  const { books, isLoading, error } = useMyBooks();

  return (
    <>
      <div>
          <h1 className="contributions-title">Tes contributions</h1>
      </div>
      <div className="contributions-list">
        {isLoading && <p role="status">Chargement...</p>}
        {error && <p role="alert">Erreur : {error}</p>}
        {!isLoading && !error && books.length === 0 && (
          <p>Aucune contribution pour le moment. Retourne sur l'accueil et clique sur "Ajouter un livre"!</p>
        )}
        {books.map((book) => (
          <ContributionCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
