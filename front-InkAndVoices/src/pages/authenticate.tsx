import { useState } from 'react';

const signUpUser = async( username: string, email: string, password: string) =>{
    return fetch('http://localhost:8032/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    })
    .then(data => data.json())
}


const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        
        try {
            const response = await signUpUser(username, email, password);
            console.log('🌼 Réponse du backend: ', response);
        } catch (error) {
            console.log('🚨 Erreur: ', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label><p>Nom d'utilisateurice</p> 
            <input 
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            </label>
            <label><p>Email</p>
            <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            </label>
            <label><p>Mot de passe</p>
            <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            </label>
            <div>
                <button type="submit">Valider</button>
            </div>
        </form>
    )
}

const Authenticate = () => {
    return (
        <>
        <h1>Se créer un compte</h1>
        <div>
            Ceci est un test de page de création de compte.
        </div>
        <SignUpForm />
        </>
    )
}

export default Authenticate; 