import { useSignUp } from '../../hooks/useSignUp'; 

export default function SignUpForm(){
    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        errors,
        isLoading,
        handleSubmit
    } = useSignUp();
 
    return (
        <form onSubmit={handleSubmit}>
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
            {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
            
            {errors.global && <p style={{color:'red'}}>{errors.global}</p>}

            <div>
                <button type="submit" disabled={isLoading}>
                    {isLoading? 'Envoi en cours...': 'Valider'}
                </button>
            </div>
        </form>
    )
}