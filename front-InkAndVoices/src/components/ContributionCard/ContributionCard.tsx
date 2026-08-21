import './ContributionCard.css';
import { Link } from 'react-router-dom';
import type { Contribution } from '../../types/Book';

const STATUS_LABELS: Record<Contribution['status'], string> = {
    pending: 'En attente',
    validated: 'Validé',
    refused: 'Refusé',
};

export default function ContributionCard({
    contribution,
    onWithdraw,
    isWithdrawing,
}: {
    contribution: Contribution;
    onWithdraw: (id: number) => void;
    isWithdrawing: boolean;
}) {
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
                {contribution.status === 'pending' && (
                    <div className="contribution-actions">
                        <Link
                            to={`/edit-book/${contribution.id}`}
                            className="contribution-action-link"
                            aria-label={`Modifier « ${contribution.title} »`}
                        >
                            Modifier
                        </Link>
                        <button
                            type="button"
                            className="contribution-action-button"
                            disabled={isWithdrawing}
                            aria-label={`Retirer « ${contribution.title} »`}
                            onClick={() => onWithdraw(contribution.id)}
                        >
                            {isWithdrawing ? 'Retrait…' : 'Retirer'}
                        </button>
                    </div>
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
