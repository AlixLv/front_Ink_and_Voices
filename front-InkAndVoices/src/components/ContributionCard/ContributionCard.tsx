import './ContributionCard.css';
import type { Contribution } from '../../types/Book';

const STATUS_LABELS: Record<Contribution['status'], string> = {
    pending: 'En attente',
    validated: 'Validé',
    refused: 'Refusé',
};

export default function ContributionCard({ contribution }: { contribution: Contribution }) {
    const submittedDate = new Date(contribution.created_at).toLocaleDateString('fr-FR');

    return (
        <li className="contribution-card">
            <div className="contribution-datas">
                <p className="contribution-title">{contribution.title}</p>
                <p className="contribution-author">{contribution.author}</p>
                <p className="contribution-date">Soumis le {submittedDate}</p>
                {contribution.validation_comment && (
                    <p className="contribution-comment">
                        Commentaire : {contribution.validation_comment}
                    </p>
                )}
            </div>
            <div className="contribution-state-container">
                <p className={`contribution-state contribution-state-${contribution.status}`}>
                    {STATUS_LABELS[contribution.status]}
                </p>
            </div>
        </li>
    );
}
