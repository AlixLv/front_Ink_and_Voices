import type { FormErrors } from '../types/User.tsx';
import { useState } from 'react';
import { signUpUser } from '../services/UserService.tsx';
import type { ApiError } from 'next/dist/server/api-utils/index';

export const useSignUp = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // logique métier du formulaire
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
    };
    
    // fonction appelant le UserService
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
            const response = await signUpUser(username, email, password);

            if (response.status === 409){
                setErrors({global: (response.data as ApiError).message}); 
                return;
            }

            if (response.status === 201){
                window.location.href = `/api/users/login`;
                return;
            }

        } catch (error) {
            setErrors({global: "Une erreur est survenue, réessayer plus tard"});
        } finally {
            setIsLoading(false);
        }
    };

    // renvoi uniquement des info dont à besoin le component
    return {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        errors,
        isLoading,
        handleSubmit
    }

}