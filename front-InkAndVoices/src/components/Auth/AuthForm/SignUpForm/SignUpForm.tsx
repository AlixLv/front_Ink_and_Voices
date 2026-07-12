import { useSignUp } from '../../../../hooks/useSignUp';
import '../AuthForm.css';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';

export default function SignUpForm(){
    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        errors,
        isLoading,
        handleSubmit
    } = useSignUp();
 
    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        Nom d'utilisateurice
                        <input 
                        className='auth-form-field'
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            disabled={isLoading}
                            aria-invalid={!!errors.username}
                            aria-describedby={errors.username ? "username-error" : undefined}
                        />
                    </label>
                    {errors.username && <output id="username-error" role="alert" className="auth-form-error">{errors.username}</output>}
                </div>

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

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        Confirmer le mot de passe
                        <input 
                            className='auth-form-field'
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                            aria-invalid={!!errors.confirmPassword}
                            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                        />
                    </label>
                    {errors.confirmPassword && <output id="confirmPassword-error" role="alert" className="auth-form-error">{errors.confirmPassword}</output>}
                </div>



                {errors.global && <output role="alert" className="auth-form-error">{errors.global}</output>}
                <div className="submit-button-container">
                <SubmitButton 
                    text={isLoading ? 'Envoi en cours...' : 'Valider'}
                    type="submit"
                    disabled={isLoading}
                />
            </div>
        </form>
    </div>
    )
}