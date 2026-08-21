import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { deleteMyAccount } from '../../services/UserService';
import BackButton from '../../components/BackButton/BackButton';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import '../../components/Auth/AuthForm/AuthForm.css';
import styles from './settings.module.css';

export default function Settings() {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading: isAuthLoading, logout } = useAuth();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        setDeleteError(null);
        try {
            await deleteMyAccount();
            await logout();
            navigate('/', { replace: true });
        } catch {
            setDeleteError('La suppression a échoué. Réessayez plus tard.');
            setIsDeleting(false);
        }
    };
    const {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        errors,
        isLoading,
        successMessage,
        handleSubmit,
    } = useUpdateProfile();

    if (isAuthLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login-required" replace />;
    }

    return (
        <main>
            <BackButton />
            <h1>Modifier ses identifiants</h1>
            <div className="auth-form-container">
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="auth-form-field-group">
                        <label className="auth-form-label">
                            Nom d'utilisateurice
                            <input
                                className="auth-form-field"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                disabled={isLoading}
                                autoComplete="username"
                                aria-invalid={!!errors.username}
                                aria-describedby={errors.username ? 'username-error' : undefined}
                            />
                        </label>
                        {errors.username && <output id="username-error" role="alert" className="auth-form-error">{errors.username}</output>}
                    </div>

                    <div className="auth-form-field-group">
                        <label className="auth-form-label">
                            Email
                            <input
                                className="auth-form-field"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={isLoading}
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                            />
                        </label>
                        {errors.email && <output id="email-error" role="alert" className="auth-form-error">{errors.email}</output>}
                    </div>

                    <div className="auth-form-field-group">
                        <label className="auth-form-label">
                            Nouveau mot de passe (laisser vide pour ne pas le changer)
                            <input
                                className="auth-form-field"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={isLoading}
                                autoComplete="new-password"
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'password-error' : undefined}
                            />
                        </label>
                        {errors.password && <output id="password-error" role="alert" className="auth-form-error">{errors.password}</output>}
                    </div>

                    <div className="auth-form-field-group">
                        <label className="auth-form-label">
                            Confirmer le nouveau mot de passe
                            <input
                                className="auth-form-field"
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                                autoComplete="new-password"
                                aria-invalid={!!errors.confirmPassword}
                                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                            />
                        </label>
                        {errors.confirmPassword && <output id="confirmPassword-error" role="alert" className="auth-form-error">{errors.confirmPassword}</output>}
                    </div>

                    {errors.global && <output role="alert" className="auth-form-error">{errors.global}</output>}
                    <p aria-live="polite" role="status">{successMessage}</p>

                    <div className="submit-button-container">
                        <SubmitButton
                            text={isLoading ? 'Envoi en cours...' : 'Enregistrer'}
                            type="submit"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </div>

            <section className={styles.dangerZone} aria-labelledby="delete-account-title">
                <h2 id="delete-account-title">Supprimer mon compte</h2>
                <p>
                    La suppression est définitive : votre compte et vos suggestions de livres
                    seront effacés, conformément à votre droit à l'effacement (RGPD).
                </p>
                {!showDeleteConfirm && (
                    <button
                        type="button"
                        className={styles.dangerButton}
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Supprimer mon compte
                    </button>
                )}
                {showDeleteConfirm && (
                    <div className={styles.dangerConfirm}>
                        <p>Confirmez-vous la suppression définitive de votre compte ?</p>
                        <div className={styles.dangerActions}>
                            <button
                                type="button"
                                className={styles.dangerButton}
                                disabled={isDeleting}
                                onClick={handleDeleteAccount}
                            >
                                {isDeleting ? 'Suppression…' : 'Oui, supprimer définitivement'}
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                disabled={isDeleting}
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                )}
                {deleteError && <p role="alert" className="auth-form-error">{deleteError}</p>}
            </section>
        </main>
    );
}
