import { useState } from 'react';

const signUpUser = async( username: string, email: string, password: string) =>{
    const res = await fetch('http://localhost:8032/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    })
    const data = await res.json();
    return {status: res.status, data}; // permet de récupérer le status (code HTTP) envoyé par le back
}

// type TypScript décrivant la forme d'un objet et qui indique quelle type de valeur est attendue si on ajoute une valeur à l'une des clé optionnelle
type FormErrors = {
    username?: string;
    email?: string;
    password?: string;
    global?: string;
}


const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    const validateInputs = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (username.length <= 0){
            newErrors.username = "Le nom d'utilisateurice ne doit pas être vide."
        }

        if (!email.includes('@')){
            newErrors.email = "L'adresse email n'est pas valide.";
        }

        if (password.length < 8){
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        return newErrors;
    }

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault(); 
        setErrors({});

        const validationErrors = validateInputs();
            if(Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return; // pas d'envoi de la requête si les inputs du formulaire sont invalides
        }
        
        try {
            const response = await signUpUser(username, email, password);
            console.log('🌼 Réponse du backend: ', response);

            if (response.status === 409){
                setErrors({global: response.data.message}); 
                return;
            }

            if (response.status === 201){
                window.location.href = `/api/users/login`;
                return;
            }

        } catch (error) {
            console.log('🚨 Erreur: ', error);
            setErrors({global: "Une erreur est survenue, réessayer plus tard"});
        }
    }      

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Nom d'utilisateurice</p> 
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
             {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

            <label>
                <p>Email</p>
                <input 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <label>
                <p>Mot de passe</p>
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
            
            {errors.global && <p style={{color:'red'}}>{errors.global}</p>}

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
        <SignUpForm />
        </>
    )
}

// TEST
export function sum(a: number, b: number): number {
  return a + b
}

export default Authenticate; 

