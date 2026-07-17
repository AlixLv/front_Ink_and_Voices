import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLoggedUser, loginUser, logoutUser, signUpUser } from './AuthService';
import type { LoggedUserDatas, SignedUserDatas } from '../types/User';

describe('AuthService - signUpUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const testData = {
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123'
    };

    it('should send correct data to the backend', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 201,
            ok: true,
            json: async () => ({ username: testData.username, email: testData.email })
        });
        vi.stubGlobal('fetch', mockFetch);

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
            json: async () => ({ username: testData.username, email: testData.email })
        });
        vi.stubGlobal('fetch', mockFetch);

        const response = await signUpUser(testData.username, testData.email, testData.password);
        const userData = response.data as SignedUserDatas;

        expect(response.status).toBe(201);
        expect(userData.username).toBe(testData.username);
        expect(userData.email).toBe(testData.email);
    });

    it('should handle conflict response (409)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 409,
            ok: false,
            json: async () => ({ message: 'User already exists' })
        });
        vi.stubGlobal('fetch', mockFetch);

        await expect(signUpUser(testData.username, testData.email, testData.password)).rejects.toThrow('HTTP error. status: 409');
    });

    it('should handle validation error response (400)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 400,
            ok: false,
            json: async () => ({ message: 'Invalid data' })
        });
        vi.stubGlobal('fetch', mockFetch);

        await expect(signUpUser(testData.username, testData.email, testData.password)).rejects.toThrow('HTTP error. status: 400');
    });

    it('should handle server error response (500)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 500,
            ok: false,
            json: async () => ({ message: 'Internal server error' })
        });
        vi.stubGlobal('fetch', mockFetch);

        await expect(signUpUser(testData.username, testData.email, testData.password)).rejects.toThrow('HTTP error. status: 500');
    });

    it('should throw error on network failure', async () => {
        const mockFetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
        vi.stubGlobal('fetch', mockFetch);
        await expect(signUpUser(testData.username, testData.email, testData.password)).rejects.toThrow('Network error');
    });
});


describe('AuthService - loginUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const testData = {
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123'
    };

    it('should send a correctly structured request', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            json: async () => ({ email: testData.email, username: testData.username })
        });
        vi.stubGlobal('fetch', mockFetch);

        await loginUser(testData.email, testData.password);

        expect(mockFetch).toHaveBeenCalled();
        const [url, options] = mockFetch.mock.calls[0];
        expect(url).toContain('/api/auth/login');
        expect(options.method).toBe('POST');
        expect(JSON.parse(options.body)).toEqual({ email: testData.email, password: 'password123' });
    });

    // Sans credentials, le navigateur jette le cookie httpOnly du backend :
    // ce test verrouille l'option pour que personne ne la retire par erreur.
    it('should send credentials so the browser keeps the httpOnly cookie', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            json: async () => ({ email: testData.email, username: testData.username })
        });
        vi.stubGlobal('fetch', mockFetch);

        await loginUser(testData.email, testData.password);

        const [, options] = mockFetch.mock.calls[0];
        expect(options.credentials).toBe('include');
    });

    it('should handle successful login response (200)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            json: async () => ({ email: testData.email, username: testData.username })
        });
        vi.stubGlobal('fetch', mockFetch);

        const response = await loginUser(testData.email, testData.password);
        const userData = response.data as LoggedUserDatas;

        expect(response.status).toBe(200);
        expect(userData.email).toBe(testData.email);
        expect(userData.username).toBe(testData.username);
    });

    it('should handle invalid credentials error (401)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 401,
            ok: false,
            json: async () => ({ message: 'Invalid email or password' })
        });
        vi.stubGlobal('fetch', mockFetch);

        await expect(loginUser(testData.email, 'wrongpassword')).rejects.toThrow('HTTP error. status: 401');
    });
});

describe('AuthService - getLoggedUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should ask the server who is logged in, sending the cookie', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            json: async () => ({ email: 'test@example.com', username: 'testuser' })
        });
        vi.stubGlobal('fetch', mockFetch);

        await getLoggedUser();

        const [url, options] = mockFetch.mock.calls[0];
        expect(url).toContain('/api/users/me');
        expect(options.method).toBe('GET');
        expect(options.credentials).toBe('include');
    });

    it('should return the user when the cookie is valid (200)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            json: async () => ({ email: 'test@example.com', username: 'testuser' })
        });
        vi.stubGlobal('fetch', mockFetch);

        const user = await getLoggedUser();

        expect(user).toEqual({ email: 'test@example.com', username: 'testuser' });
    });

    // 401 = pas connectée : c'est une réponse normale, pas une erreur.
    it('should return null when not logged in (401)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 401,
            ok: false,
            json: async () => ({ message: 'Token invalide ou absent' })
        });
        vi.stubGlobal('fetch', mockFetch);

        await expect(getLoggedUser()).resolves.toBeNull();
    });

    it('should throw on a real server error (500)', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 500,
            ok: false,
            json: async () => ({ message: 'Internal server error' })
        });
        vi.stubGlobal('fetch', mockFetch);

        await expect(getLoggedUser()).rejects.toThrow('HTTP error. status: 500');
    });
});

describe('AuthService - logoutUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Le cookie étant httpOnly, seul le backend peut le supprimer.
    it('should call the backend so it can clear the httpOnly cookie', async () => {
        const mockFetch = vi.fn().mockResolvedValueOnce({
            status: 200,
            ok: true,
            json: async () => ({})
        });
        vi.stubGlobal('fetch', mockFetch);

        await logoutUser();

        const [url, options] = mockFetch.mock.calls[0];
        expect(url).toContain('/api/auth/logout');
        expect(options.method).toBe('DELETE');
        expect(options.credentials).toBe('include');
    });
});
