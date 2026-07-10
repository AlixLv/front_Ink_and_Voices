import { useSignUp } from '../../hooks/useSignUp'; 
import '../AuthForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function SignUpForm(){
    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,  // ← Nouveau
        errors,
        isLoading,
        handleSubmit
    } = useSignUp();
 
    return (
        <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label className="auth-form-label">
                <p>Nom d'utilisateurice</p> 
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
             {errors.username && <p id="username-error" role="alert" style={{ color: 'red' }}>{errors.username}</p>}

            <label className="auth-form-label">
                <p>Email</p>
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
            {errors.email && <p id="email-error" role="alert" style={{ color: 'red' }}>{errors.email}</p>}

            <label className="auth-form-label">
                <p>Mot de passe</p>
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

            {errors.password && <p id="password-error" role="alert" style={{color:'red'}}>{errors.password}</p>}

            <label className="auth-form-label">
                <p>Confirmer le mot de passe</p>
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
            {errors.confirmPassword && <p id="confirmPassword-error" role="alert" style={{color:'red'}}>{errors.confirmPassword}</p>}
            
            {errors.global && <p role="alert" style={{color:'red'}}>{errors.global}</p>}
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