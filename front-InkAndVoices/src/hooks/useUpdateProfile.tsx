import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../services/AuthService';
import { HttpError } from '../services/HttpError';
import { useAuth } from '../contexts/AuthContext';
import type { UpdateProfileFormErrors, UpdateProfileInput } from '../types/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useUpdateProfile = () => {
    const navigate = useNavigate();
    const { email: currentEmail, username: currentUsername, login, logout } = useAuth();

    const [email, setEmail] = useState<string>(currentEmail ?? '');
    const [username, setUsername] = useState<string>(currentUsername ?? '');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [errors, setErrors] = useState<UpdateProfileFormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const validateInputs = (): UpdateProfileFormErrors => {
        const newErrors: UpdateProfileFormErrors = {};

        if (email.trim().length > 0 && !EMAIL_REGEX.test(email.trim())) {
            newErrors.email = "Le format de l'email est invalide.";
        }
        if (password.length > 0 && password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        }

        const emailChanged = email.trim().length > 0 && email.trim() !== currentEmail;
        const usernameChanged = username.trim().length > 0 && username.trim() !== currentUsername;
        if (!emailChanged && !usernameChanged && password.length === 0) {
            newErrors.global = 'Modifiez au moins un champ avant de valider.';
        }

        return newErrors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage(null);

        const newErrors = validateInputs();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const input: UpdateProfileInput = {};
        if (email.trim().length > 0 && email.trim() !== currentEmail) input.email = email.trim();
        if (username.trim().length > 0 && username.trim() !== currentUsername) input.username = username.trim();
        if (password.length > 0) input.password = password;

        setIsLoading(true);
        try {
            const result = await updateProfile(input);

            if (result.requiresLogin) {
                await logout();
                navigate('/login', { replace: true });
                return;
            }

            await login();
            setPassword('');
            setConfirmPassword('');
            setSuccessMessage('Profil mis à jour.');
        } catch (e) {
            if (e instanceof HttpError && e.status === 409) {
                setErrors({ global: 'Cet email ou ce nom est déjà utilisé.' });
            } else if (e instanceof HttpError && e.status === 401) {
                navigate('/login-required', { replace: true });
            } else {
                setErrors({ global: "La mise à jour a échoué. Réessayez plus tard." });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        errors,
        isLoading,
        successMessage,
        handleSubmit,
    };
};
