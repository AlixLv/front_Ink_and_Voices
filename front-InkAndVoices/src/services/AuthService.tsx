import type { LoginResponse, SignUpResponse } from '../types/User';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

// Erreur HTTP "métier" : le fetch a abouti, mais le backend a répondu avec un
// code d'erreur (4xx/5xx). On transporte le status ET le corps de la réponse
// pour que le hook puisse choisir le bon message à afficher.
// Le message ("HTTP error. status: 409") est ce que vérifient les tests du service.
export class HttpError extends Error {
    status: number;
    data: unknown;
    constructor(status: number, data: unknown) {
        super(`HTTP error. status: ${status}`);
        this.name = 'HttpError';
        this.status = status;
        this.data = data;
    }
}

export const signUpUser = async(
    username: string,
    email: string,
    password: string): Promise<SignUpResponse> => {
        try {
        const payload = { username, email, password };
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        // On lit le corps même en cas d'erreur : le backend y met son message
        // (ex: "User already exists"). Si la réponse est vide (500, 503...),
        // on retombe sur un objet vide plutôt que de faire planter le .json().
        const data = await response.json().catch(() => ({}));

        // Réponse non-2xx : on lève une erreur typée, rattrapée par le hook.
        if (!response.ok) {
            throw new HttpError(response.status, data);
        }
        return {status: response.status, data};
        } catch (error) {
            throw error;
        }
    };

export const loginUser = async(
    email: string,
    password: string): Promise<LoginResponse> => {
        try {
        const payload = { email, password };
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        });

        // On lit le corps même en cas d'erreur : le backend y met son message
        // Si la réponse est vide (500, 503...), on retombe sur un objet vide
        const data = await response.json().catch(() => ({}));

        // Réponse non-2xx : on lève une erreur typée, rattrapée par le hook.
        if (!response.ok) {
            throw new HttpError(response.status, data);
        }
        return {status: response.status, data};
        } catch (error) {
            throw error;
        }
    };

    // export const loginUser = async(
    // email: string,
    // password: string): Promise<LoginResponse> => {
    //     try {
    //     const payload = { email, password };
    //     console.log('📤 Données envoyées au backend:', payload);
        
    //     const response = await fetch(`${API_URL}/api/auth/login`, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'}, 
    //         body: JSON.stringify(payload)
    //     });
        
    //     if(!response.ok) {
    //         // Essayer de parser la réponse d'erreur du backend
    //         let errorData;
    //         try {
    //             errorData = await response.json();
    //         } catch {
    //             // Si le backend retourne une réponse vide (500, 503, etc)
    //             errorData = { message: 'Erreur serveur' };
    //         }
    //         throw new Error(JSON.stringify({
    //             status: response.status,
    //             message: errorData.message || 'Erreur serveur'
    //         }));
    //     }

    //     const data = await response.json();
    //     console.log('📥 Réponse du backend:', { status: response.status, data });
    //     return {status: response.status, data};
    //     } catch (error) {
    //         console.error("Erreur lors de la connexion de l'utilisateur", error);
    //         throw error;
    //     }
    // };
