import type { SignUpResponse } from '../types/User'; 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const signUpUser = async(
    username: string, 
    email: string,
    password: string): Promise<SignUpResponse> => {
        try {
        const payload = { username, email, password };
        console.log('📤 Données envoyées au backend:', payload); // check pour vérifier que les données sont bien envoyées au back
        
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload) // plus standard ed faire comme ça
        });
        // if(!response.ok) {
        //     throw new Error(`HTTP error. status: ${response.status}`);
        // }

        const data = await response.json();
        console.log('📥 Réponse du backend:', { status: response.status, data });
        return {status: response.status, data};
        } catch (error) {
            console.error("Erreur lors de l'inscription de l'utilisateur", error);
            throw error;
        }
    };



    // Pour le response.ok, je préfère demander à Anaïs ce qu'elle en pense. 
    // C'est un gros truc la gestion de l'erreur et son affichage, et là je 