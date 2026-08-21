import './ContributionsList.css';
import ContributionCard from '../ContributionCard/ContributionCard';
import { useMyContributions } from '../../hooks/useMyContributions';


export default function ContributionList() {
  const { contributions, isLoading, error, withdraw, withdrawingId, feedback } = useMyContributions();

  return (
    <>
      <div>
          <h2 className="contributions-title">Tes contributions</h2>
      </div>
      <p aria-live="polite" role="status">{feedback}</p>
      {isLoading && <p role="status">Chargement de tes contributions…</p>}
      {error && <p role="alert">Erreur : {error}</p>}
      {!isLoading && !error && contributions.length === 0 && (
        <div className="contributions-list">
          Aucune contribution pour le moment. Retourne sur l'accueil et clique sur "Ajouter un livre"!
        </div>
      )}
      {!isLoading && !error && contributions.length > 0 && (
        <ul className="contributions-list">
          {contributions.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}
              onWithdraw={withdraw}
              isWithdrawing={withdrawingId === contribution.id}
            />
          ))}
        </ul>
      )}
    </>
  );
}
