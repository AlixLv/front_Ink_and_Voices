import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import BackButton from '../../../components/BackButton/BackButton';
import styles from '../admin.module.css';

export default function AdminUserDetail() {
    const { id } = useParams();
    const { isAuthenticated, isAdmin, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login-required" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className={styles.page}>
            <BackButton />
            <h1 className={styles.title}>Détail du compte {id}</h1>
            <p className={styles.intro}>
                Cette page est en cours. Vous trouverez bientôt ici la gestion des comptes.
            </p>
        </main>
    );
}
