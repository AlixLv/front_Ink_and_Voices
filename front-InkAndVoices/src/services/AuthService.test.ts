import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signUpUser } from './AuthService';

describe('AuthService - signUpUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should send correct data to the backend', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 201,
            ok: true,
            json: async () => ({ username: 'testuser123', email: 'test@example.com' })
        });
        vi.stubGlobal('fetch', mockFetch);

        const testData = {
            username: 'testuser123',
            email: 'test@example.com',
            password: 'password123'
        };

        await signUpUser(testData.username, testData.email, testData.password);

        // Vérifie que fetch a été appelé
        expect(mockFetch).toHaveBeenCalled();

        // Récupère les arguments de l'appel fetch
        const [url, options] = mockFetch.mock.calls[0];

        // Vérifie l'URL
        expect(url).toContain('/api/auth/signup');

        // Vérifie la méthode POST
        expect(options.method).toBe('POST');

        // Vérifie les headers
        expect(options.headers['Content-Type']).toBe('application/json');

        // Vérifie que le body contient les bonnes données
        const body = JSON.parse(options.body);
        expect(body).toEqual(testData);
    });

    it('should handle successful signup response (201)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 201,
            ok: true,
            json: async () => ({ username: 'testuser123', email: 'test@example.com' })
        });
        vi.stubGlobal('fetch', mockFetch);

        const response = await signUpUser('testuser123', 'test@example.com', 'password123');

        expect(response.status).toBe(201);
        expect(response.data).toEqual({ username: 'testuser123', email: 'test@example.com' });
    });

    it('should handle conflict response (409)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 409,
            ok: false,
            json: async () => ({ message: 'User already exists' })
        });
        vi.stubGlobal('fetch', mockFetch);

        const response = await signUpUser('testuser123', 'test@example.com', 'password123');

        expect(response.status).toBe(409);
        expect(response.data).toEqual({ message: 'User already exists' });
    });

    it('should handle validation error response (400)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 400,
            ok: false,
            json: async () => ({ message: 'Invalid data' })
        });
        vi.stubGlobal('fetch', mockFetch);

        const response = await signUpUser('testuser123', 'test@example.com', 'password123');

        expect(response.status).toBe(400);
        expect(response.data).toEqual({ message: 'Invalid data' });
    });

    it('should handle server error response (500)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 500,
            ok: false,
            json: async () => ({ message: 'Internal server error' })
        });
        vi.stubGlobal('fetch', mockFetch);

        const response = await signUpUser('testuser123', 'test@example.com', 'password123');

        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: 'Internal server error' });
    });

    it('should throw error on network failure', async () => {
        const mockFetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
        vi.stubGlobal('fetch', mockFetch);

        await expect(signUpUser('testuser123', 'test@example.com', 'password123')).rejects.toThrow('Network error');
    });
});
