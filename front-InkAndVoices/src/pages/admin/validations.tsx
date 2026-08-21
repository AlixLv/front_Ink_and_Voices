import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useValidationHistory } from '../../hooks/useValidationHistory';
import BackButton from '../../components/BackButton/BackButton';
import styles from './admin.module.css';

const DECISION_LABELS: Record<string, string> = {
    validated: 'Validé',
    refused: 'Refusé',
    pending: 'En attente',
};

export default function AdminValidations() {
    const { isAuthenticated, isAdmin, isLoading: isAuthLoading } = useAuth();
    const { validations, isLoading, error } = useValidationHistory();

    if (isAuthLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login-required" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className={styles.page}>
            <BackButton />
            <h1 className={styles.title}>Historique des validations</h1>
            {isLoading && <p role="status">Chargement de l'historique…</p>}
            {error && <p role="alert" className={styles.error}>{error}</p>}
            {!isLoading && !error && validations.length === 0 && (
                <p>Aucune décision enregistrée pour le moment.</p>
            )}
            {validations.length > 0 && (
                <ul className={styles.bookList}>
                    {validations.map((validation) => (
                        <li key={validation.id} className={styles.bookCard}>
                            <h2 className={styles.bookTitle}>
                                {validation.book.title} — {DECISION_LABELS[validation.status] ?? validation.status}
                            </h2>
                            <p className={styles.bookMeta}>{validation.book.author}</p>
                            <p className={styles.bookMeta}>
                                Décision de {validation.admin.username} le{' '}
                                {new Date(validation.validation_date).toLocaleDateString('fr-FR')}
                            </p>
                            {validation.comment && (
                                <p className={styles.bookMeta}>Commentaire : {validation.comment}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
