import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BackButton from '../../components/BackButton/BackButton';
import styles from './admin.module.css';

export default function AdminDashboard() {
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
            <h1 className={styles.title}>Espace admin</h1>
            <p className={styles.intro}>Gérez les contenus proposés par la communauté.</p>
            <ul className={styles.linkList}>
                <li>
                    <Link to="/admin/reviews">Livres en attente de validation</Link>
                </li>
                <li>
                    <Link to="/admin/validations">Historique des validations</Link>
                </li>
                <li>
                    <Link to="/admin/users">Comptes</Link>
                </li>
            </ul>
        </main>
    );
}
