import type { LoggedUserDatas, LoginResponse, SignUpResponse } from '../types/User';
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
            // Indispensable : sans credentials, le navigateur IGNORE le
            // Set-Cookie d'une réponse cross-origin (front :5177, API :8032).
            // C'est ce cookie httpOnly qui authentifie ensuite toutes les requêtes.
            credentials: 'include',
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

// Qui est connectée ? C'est le SERVEUR qui répond, à partir du cookie httpOnly.
// C'est notre unique source de vérité : contrairement au localStorage, la
// personne qui utilise l'app ne peut pas mentir au serveur en éditant sa console.
// Renvoie null si personne n'est connectée (401), ce qui est un cas normal.
export const getLoggedUser = async (): Promise<LoggedUserDatas | null> => {
    const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'GET',
        credentials: 'include',
    });

    // 401 = pas (ou plus) connectée. Ce n'est pas une erreur, c'est une réponse.
    if (response.status === 401) {
        return null;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new HttpError(response.status, data);
    }

    return data as LoggedUserDatas;
};

// La déconnexion DOIT passer par le backend : le cookie étant httpOnly, JS ne
// peut pas le supprimer lui-même. Vider un state côté front ne déconnecte rien.
export const logoutUser = async (): Promise<void> => {
    await fetch(`${API_URL}/api/auth/logout`, {
        method: 'DELETE',
        credentials: 'include',
    });
};
