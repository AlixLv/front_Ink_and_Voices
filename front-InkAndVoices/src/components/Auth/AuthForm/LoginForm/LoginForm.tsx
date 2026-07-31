import { Link } from 'react-router-dom';
import { useLogin } from '../../../../hooks/useLogin.tsx';
import '../AuthForm.css';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';

export default function LoginForm(){
    const {
        email, setEmail,
        password, setPassword,
        errors,
        isLoading,
        handleSubmit
    } = useLogin();
 
    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        Email
                        <input 
                            className='auth-form-field'
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={isLoading}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                    </label>
                    {errors.email && <output id="email-error" role="alert" className="auth-form-error">{errors.email}</output>}
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        Mot de passe
                        <input 
                            className='auth-form-field'
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={isLoading}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? "password-error" : undefined}
                        />
                    </label>
                    {errors.password && <output id="password-error" role="alert" className="auth-form-error">{errors.password}</output>}
                </div>


                {errors.global && <output role="alert" className="auth-form-error">{errors.global}</output>}
                <div className="submit-button-container">
                <SubmitButton
                    text={isLoading ? 'Envoi en cours...' : 'Valider'}
                    type="submit"
                    disabled={isLoading}
                />
            </div>
            <p className="auth-form-switch">
                Pas encore de compte ? <Link to="/signup">Inscrivez-vous</Link>
            </p>
            <p className="auth-form-legal">
                <Link to="/privacy-policy">Politique de confidentialité</Link>
            </p>
        </form>
    </div>
    )
}