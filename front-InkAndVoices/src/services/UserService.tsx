import type { SignUpResponse, ApiError } from '../types/User'; 

export interface SignUpResult {
    status: number;
    data: SignUpResponse | ApiError;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const signUpUser = async(
    username: string, 
    email: string,
    password: string): Promise<SignUpResult> => {
        const response = await fetch(`{${API_URL}/api/auth/signup`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ username, email, password})
        });

        const data = await response.json();
        return {status: response.status, data};
    } 
};
