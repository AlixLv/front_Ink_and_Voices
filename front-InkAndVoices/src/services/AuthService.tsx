// import type { User } from '../types/User';
interface LoginResponse {
    email: string;
    username: string;
    token: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const loginService = async(email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
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
        const data: LoginResponse = await response.json()
        return data;
        // les datas retournées depuis le backend sont : email, aces_token jwt, username
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
    
};