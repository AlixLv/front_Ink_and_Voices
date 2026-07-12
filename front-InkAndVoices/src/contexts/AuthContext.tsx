import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    email: string | null;
    username: string | null;
    login: (token: string, email: string, username: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    // Charger le token depuis localStorage au démarrage
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedEmail = localStorage.getItem('userEmail');
        const storedUsername = localStorage.getItem('username');
        
        if (storedToken) {
            setToken(storedToken);
            setEmail(storedEmail);
            setUsername(storedUsername);
        }
    }, []);

    const login = (newToken: string, newEmail: string, newUsername: string) => {
        setToken(newToken);
        setEmail(newEmail);
        setUsername(newUsername);
        
        // Stocker dans localStorage pour la persistance
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('userEmail', newEmail);
        localStorage.setItem('username', newUsername);
    };

    const logout = () => {
        setToken(null);
        setEmail(null);
        setUsername(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{
            token,
            email,
            username,
            login,
            logout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
    }
    return context;
};
