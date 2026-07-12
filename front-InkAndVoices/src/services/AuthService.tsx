import type { SignUpResponse } from '../types/User'; 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const signUpUser = async(
    username: string, 
    email: string,
    password: string): Promise<SignUpResponse> => {
        try {
        const payload = { username, email, password };
        console.log('📤 Données envoyées au backend:', payload);
        
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        });
        
        if(!response.ok) {
            // Essayer de parser la réponse d'erreur du backend
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                // Si le backend retourne une réponse vide (500, 503, etc)
                errorData = { message: 'Erreur serveur' };
            }
            throw new Error(JSON.stringify({
                status: response.status,
                message: errorData.message || 'Erreur serveur'
            }));
        }

        const data = await response.json();
        console.log('📥 Réponse du backend:', { status: response.status, data });
        return {status: response.status, data};
        } catch (error) {
            console.error("Erreur lors de l'inscription de l'utilisateur", error);
            throw error;
        }
    };
