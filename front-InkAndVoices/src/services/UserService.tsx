import type { AdminUser } from '../types/User';
import { HttpError } from './HttpError';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export const deleteMyAccount = async (): Promise<void> => {
    const response = await fetch(`${API_URL}/api/users/me`, {
        method: 'DELETE',
        credentials: 'include',
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new HttpError(response.status, data);
    }
};

export const getUsers = async (): Promise<AdminUser[]> => {
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new HttpError(response.status, data);
    }
    return data;
};

export const getUserDetail = async (id: string): Promise<AdminUser> => {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new HttpError(response.status, data);
    }
    return data;
};

export const updateUserRole = async (id: string, role: 'user' | 'admin'): Promise<AdminUser> => {
    const response = await fetch(`${API_URL}/api/users/${id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new HttpError(response.status, data);
    }
    return data;
};
