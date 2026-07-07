// Used to create a session and store the user data in the context

// import type { User } from '../types/User';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

// ça ne retourne pas un user mais une connexion? une promesse? de quoi?
export const loginService = async(email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
        if (!response.ok) {
            throw new Error(`HTTP error. status: ${response.status}`);
        }
        const data = await response.json()
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
    
};