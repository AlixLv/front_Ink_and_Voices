import type { SignUpResponse } from '../types/User'; 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const signUpUser = async(
    username: string, 
    email: string,
    password: string): Promise<SignUpResponse> => {
        try {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ username, email, password})
        });
        if(!response.ok) {
            throw new Error(`HTTP error. status: ${response.status}`);
        }
        const data = await response.json();
        return {status: response.status, data};
        } catch (error) {
            console.error("Erreur lors de l'inscription de l'utilisateur", error);
            throw error;
        }
    };