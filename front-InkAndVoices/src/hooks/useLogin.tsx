import type { FormErrors } from '../types/User.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';

export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // pas d'envoi de la requête si les inputs du formulaire sont invalides
        }

        setIsLoading(true);

        try {
            await loginUser(email, password);

            // Le cookie httpOnly est déjà posé par le backend : on redemande
            // au serveur qui est connecté plutôt que de faire confiance à la
            // réponse du login (qui ne renvoie pas l'id).
            await login();

            // Si on arrive ici, c'est que le statut est 2xx (succès)
            navigate(`/`);
        } catch (error) {
            const errorMessage =
                error instanceof Error && error.message
                    ? error.message
                    : "Une erreur est survenue, réessayez plus tard";

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
    };
};