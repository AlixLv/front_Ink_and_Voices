import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import BackButton from '../../components/BackButton/BackButton';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import '../../components/Auth/AuthForm/AuthForm.css';

export default function Settings() {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
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
        </main>
    );
}
