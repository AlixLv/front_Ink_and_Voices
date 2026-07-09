import { useSignUp } from '../../hooks/useSignUp'; 

// interface SignUpFormUserDatas {
//     username: string;
//     email: string;
//     password: string;
// }

export default function SignUpForm(){
    const { //créer une interface dans le composant, qui regroupe username, email et password (à voir si on refato ça du coup)
        username, setUsername,
        email, setEmail,
        password, setPassword,
        errors,
        isLoading,
        handleSubmit
    } = useSignUp();
 
    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <label>
                <p>Nom d'utilisateurice</p> 
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={isLoading}
                />
            </label>
             {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            {/* trop bien la gestion des erreurs direct ici! */}
            <label>
                <p>Email</p>
                <input 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </label>
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <label>
                <p>Mot de passe</p>
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </label>
            {/* et la confirmation de mdp? */}
            {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
            
            {errors.global && <p style={{color:'red'}}>{errors.global}</p>}
            {/* est-ce que les erreurs sont écrites de façon user-friendly? */}
            <div className="submit-button-container">
                <button type="submit" disabled={isLoading}>
                    {isLoading? 'Envoi en cours...': 'Valider'}
                </button>
                {/*  ici il faut utiliser le composant SubmitButton. Peut-être adapter sa logique (lui rajouter des arguments optionnels pour qu'il accepte isLoading, je sais pas) */}
            </div>
        </form>
    )
}