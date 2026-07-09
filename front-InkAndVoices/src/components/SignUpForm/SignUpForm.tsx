import { useSignUp } from '../../hooks/useSignUp'; 
import '../AuthForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';
// interface SignUpFormUserDatas {
//     username: string;
//     email: string;
//     password: string;
// }


// aria-invalid={errors.machin}  indique aux technologies d'assistance que le champ est en erreur dès que errors.xxx existe.
// aria-describedby="xxx-error" : relie l'input à son message d'erreur — un lecteur d'écran lira le message quand l'utilisateur est focus sur le champ concerné.
// Pourquoi undefined et pas juste une chaîne vide "" ?
// C'est là le point important : en React, quand un attribut JSX a la valeur undefined (ou null), React n'ajoute pas du tout l'attribut au DOM final. Alors que si vous mettiez "", l'attribut serait bien présent dans le HTML, mais vide :
// html<!-- avec undefined : l'attribut disparaît complètement -->
// <input />

// <!-- avec "" : l'attribut existe mais est vide -->
// <input aria-describedby="" />
// Le deuxième cas est problématique pour l'accessibilité : un aria-describedby="" vide peut semer la confusion chez certains lecteurs d'écran, qui s'attendent à trouver un élément avec cet id (même vide) et peuvent générer un comportement inattendu. On veut donc que l'attribut soit totalement absent quand il n'y a pas d'erreur, pas juste vide.
// En résumé : ce undefined sert à dire "si pas d'erreur, ne mets même pas l'attribut aria-describedby sur l'input" — plutôt que de le laisser avec une valeur vide ou pointant vers un id qui n'existe pas dans le DOM (ce qui arriverait si vous mettiez juste "username-error" en dur, sans condition, alors que le <p> correspondant n'est rendu que quand il y a une erreur).

//role=alert sert à annoncer l'erreur même si le user n'est pas focus sur l'input

export default function SignUpForm(){
    const { //créer une interface dans le composant, qui regroupe username, email et password (à voir si on refato ça du coup)
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