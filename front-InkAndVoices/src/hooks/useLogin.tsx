import type { FormErrors } from '../types/User.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../services/AuthService.tsx';

export const useLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);


    // logique métier du formulaire
    const validateInputs = (): FormErrors => {
        const newErrors: FormErrors = {};

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
            const response = await LoginUser(email, password);
            // Si on arrive ici, c'est que le statut est 2xx (succès)
            console.log('✅ Connexion réussie:', response.data);
            navigate(`/`);
        } catch (error) {
            // Toutes les erreurs (réseau + HTTP) arrivent ici
            let errorMessage = "Une erreur est survenue, réessayez plus tard";
            
            if (error instanceof Error) {
                try {
                    const errorData = JSON.parse(error.message);
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = error.message || errorMessage;
                }
            }
            
            setErrors({ global: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        errors,
        isLoading,
        handleSubmit
    }
}