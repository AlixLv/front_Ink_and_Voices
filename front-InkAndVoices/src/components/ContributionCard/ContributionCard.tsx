import type { MyBook } from '../../types/Book';
import './ContributionCard.css';

interface ContributionCardProps {
  book: MyBook;
}

const STATUS_LABELS: Record<MyBook['status'], string> = {
  pending: 'En attente',
  validated: 'Accepté',
  refused: 'Refusé',
};

// pending -> gris neutre (comme les métadonnées ailleurs) ; validated/refused
// reprennent le vert/rouge déjà utilisés pour les actions Valider/Refuser
// (AdminBookDetail), pour rester cohérent avec le reste de l'app.
const STATUS_CLASSES: Record<MyBook['status'], string> = {
  pending: 'contribution-state--pending',
  validated: 'contribution-state--validated',
  refused: 'contribution-state--refused',
};

export default function ContributionCard({ book }: ContributionCardProps) {
  const submittedOn = new Date(book.created_at).toLocaleDateString('fr-FR');

  return (
    <div className="contribution-card">
      <div className="contribution-datas">
        <p className="contribution-title">{book.title}</p>
        <p className="contribution-author">{book.author}</p>
        <p className="contribution-date">Soumis le {submittedOn}</p>
      </div>
      <span className={`contribution-state ${STATUS_CLASSES[book.status]}`}>
        {STATUS_LABELS[book.status]}
      </span>
    </div>
  );
}
