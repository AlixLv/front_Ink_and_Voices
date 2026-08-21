import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getLoggedUser, logoutUser } from '../services/AuthService';

// Le token n'apparaît nulle part ici, et c'est volontaire.
// Il est stocké par le backend dans un cookie httpOnly : le navigateur l'envoie
// tout seul à chaque requête (grâce à `credentials: 'include'`), et JS ne peut
// NI le lire NI le voler. C'est le backend qui décide qui est connectée.
// Ce contexte ne garde donc que des infos d'affichage (email, username).
interface AuthContextType {
    // Vient de GET /me (LoggedUserDatas), jamais du login : utilisé par la
    // navbar pour construire /profile/:id.
    id: string | null;
    email: string | null;
    username: string | null;
    isAdmin: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<'user' | 'admin' | null>(null);
    // true tant qu'on n'a pas demandé au serveur qui est connectée : ça évite
    // d'afficher brièvement "déconnectée" alors que le cookie est valide.
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Au démarrage, on demande au serveur "qui suis-je ?" (le cookie part tout
    // seul). Avant, on relisait le localStorage : mais le localStorage est
    // éditable à la main dans la console, donc il ne prouvait rien.
    useEffect(() => {
        let cancelled = false;

        getLoggedUser()
            .then((user) => {
                if (cancelled) return;
                setId(user?.id ?? null);
                setEmail(user?.email ?? null);
                setUsername(user?.username ?? null);
                setRole(user?.role ?? null);
            })
            .catch(() => {
                // Serveur injoignable : on considère qu'on n'est pas connectée.
                if (cancelled) return;
                setId(null);
                setEmail(null);
                setUsername(null);
                setRole(null);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => { cancelled = true; };
    }, []);

    // Appelée après un login réussi : le cookie est déjà posé par le backend.
    // On redemande au serveur "qui suis-je ?" plutôt que de faire confiance à
    // la réponse du POST /login (qui ne renvoie pas l'id) : /me reste l'unique
    // source de vérité, comme au chargement initial.
    const login = useCallback(async () => {
        const user = await getLoggedUser();
        setId(user?.id ?? null);
        setEmail(user?.email ?? null);
        setUsername(user?.username ?? null);
        setRole(user?.role ?? null);
    }, []);

    // On demande au backend d'expirer le cookie AVANT de vider l'affichage :
    // sans cet appel, la session resterait valide côté serveur.
    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } finally {
            setId(null);
            setEmail(null);
            setUsername(null);
            setRole(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            id,
            email,
            username,
            isAdmin: role === 'admin',
            isAuthenticated: !!email,
            isLoading,
            login,
            logout
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
