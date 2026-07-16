export interface AuthContextType {
    token: string | null;
    email: string | null;
    username: string | null;
    id: string | null;
    login: (token: string, email: string, username: string, id: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}