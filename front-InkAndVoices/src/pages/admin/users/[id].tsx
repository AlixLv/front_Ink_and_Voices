import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserDetail, updateUserRole } from '../../../services/UserService';
import type { AdminUser } from '../../../types/User';
import { HttpError } from '../../../services/HttpError';
import BackButton from '../../../components/BackButton/BackButton';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import styles from '../admin.module.css';

export default function AdminUserDetail() {
    const { id } = useParams();
    const { id: myId, isAuthenticated, isAdmin, isLoading: isAuthLoading } = useAuth();
    const [user, setUser] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        let isMounted = true;
        getUserDetail(id)
            .then((data) => { if (isMounted) setUser(data); })
            .catch(() => { if (isMounted) setError('Impossible de charger ce compte.'); })
            .finally(() => { if (isMounted) setIsLoading(false); });
        return () => { isMounted = false; };
    }, [id]);

    if (isAuthLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login-required" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    const isSelf = user !== null && user.id === myId;
    const targetRole = user?.role === 'admin' ? 'user' : 'admin';

    const handleRoleChange = async () => {
        if (!user) return;
        setIsSaving(true);
        setFeedback(null);
        try {
            const updated = await updateUserRole(user.id, targetRole);
            setUser(updated);
            setFeedback(
                updated.role === 'admin'
                    ? `${updated.username} est maintenant administrateurice.`
                    : `${updated.username} est maintenant utilisateurice.`
            );
        } catch (e) {
            setFeedback(e instanceof HttpError ? e.message : 'Le changement de rôle a échoué.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className={styles.page}>
            <BackButton />
            <h1 className={styles.title}>Détail du compte</h1>
            <p aria-live="polite" role="status" className={styles.feedback}>{feedback}</p>
            {isLoading && <p role="status">Chargement du compte…</p>}
            {error && <p role="alert" className={styles.error}>{error}</p>}
            {user && (
                <div className={styles.bookCard}>
                    <h2 className={styles.bookTitle}>{user.username}</h2>
                    <p className={styles.bookMeta}>{user.email}</p>
                    <p className={styles.bookMeta}>
                        Rôle : {user.role === 'admin' ? 'Administrateurice' : 'Utilisateurice'}
                    </p>
                    <p className={styles.bookMeta}>
                        Inscrit·e le {new Date(user.created_at).toLocaleDateString('fr-FR')} ·{' '}
                        {user.contributions_count} contribution{user.contributions_count > 1 ? 's' : ''}
                    </p>
                    {isSelf && <p className={styles.bookMeta}>Vous ne pouvez pas modifier votre propre rôle.</p>}
                    {!isSelf && (
                        <div className={styles.actions}>
                            <SubmitButton
                                text={
                                    isSaving
                                        ? 'Enregistrement…'
                                        : targetRole === 'admin'
                                            ? 'Promouvoir administrateurice'
                                            : 'Rétrograder utilisateurice'
                                }
                                disabled={isSaving}
                                onClick={handleRoleChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
