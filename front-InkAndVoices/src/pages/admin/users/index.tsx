import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getUsers } from '../../../services/UserService';
import type { AdminUser } from '../../../types/User';
import BackButton from '../../../components/BackButton/BackButton';
import styles from '../admin.module.css';

export default function AdminUsers() {
    const { isAuthenticated, isAdmin, isLoading: isAuthLoading } = useAuth();
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        getUsers()
            .then((data) => { if (isMounted) setUsers(data); })
            .catch(() => { if (isMounted) setError('Impossible de charger les comptes.'); })
            .finally(() => { if (isMounted) setIsLoading(false); });
        return () => { isMounted = false; };
    }, []);

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
            <h1 className={styles.title}>Comptes</h1>
            {isLoading && <p role="status">Chargement des comptes…</p>}
            {error && <p role="alert" className={styles.error}>{error}</p>}
            {!isLoading && !error && (
                <ul className={styles.bookList}>
                    {users.map((user) => (
                        <li key={user.id} className={styles.bookCard}>
                            <h2 className={styles.bookTitle}>
                                <Link to={`/admin/users/${user.id}`}>{user.username}</Link>
                            </h2>
                            <p className={styles.bookMeta}>{user.email}</p>
                            <p className={styles.bookMeta}>
                                Rôle : {user.role === 'admin' ? 'Administrateurice' : 'Utilisateurice'} ·{' '}
                                {user.contributions_count} contribution{user.contributions_count > 1 ? 's' : ''}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
