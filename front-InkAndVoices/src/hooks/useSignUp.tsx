import type { FormErrors } from '../types/User.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../services/AuthService.tsx';
import { HttpError } from '../services/HttpError.ts';

export const useSignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);


    // logique métier du formulaire
    const validateInputs = (): FormErrors => {
        const newErrors: FormErrors = {};


        if (username.length <= 0) {
            newErrors.username = "Le nom d'utilisateurice ne doit pas être vide."
        } else if (username.length < 8) {
            newErrors.username = "Le nom d'utilisateurice doit contenir au moins 8 caractères.";
        }

        if (email.length <= 0) {
            newErrors.email = "L'email ne doit pas être vide.";
        } else if (!email.includes('@')) {
            newErrors.email = "L'adresse email n'est pas valide.";
        }

        if (password.length <= 0) {
            newErrors.password = "Le mot de passe ne doit pas être vide.";
        } else if (password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        
        if (confirmPassword.length <= 0) {
            newErrors.confirmPassword = "Veuillez confirmer votre mot de passe.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        return newErrors;
    };
    
    // fonction appelant le AuthService
    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault(); 
        setErrors({});

        const validationErrors = validateInputs();
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // pas d'envoi de la requête si les inputs du formulaire sont invalides
        }

        setIsLoading(true);
        
        try {
            await signUpUser(username, email, password);
            // on renvoie le password en clair au backend. Le backend hash le password avant de le stocker, mais est-ce qu'il n'y a pas un risque qu'il soit intercepté pendant le transport?
            //  omment sécuriser ça? On doit jamais sécuriser que le backend

            // Si on arrive ici, c'est que le service n'a pas levé d'erreur : réponse 2xx,
            // le compte est créé, on redirige vers le login.
            navigate(`/login`);
        } catch (error) {
            if (error instanceof HttpError) {
                setErrors({global: error.message});
            } else {
                // erreur réseau (fetch a échoué, pas de réponse du serveur)
                setErrors({global: "Une erreur est survenue, réessayez plus tard."});
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        errors,
        isLoading,
        handleSubmit
    }
}