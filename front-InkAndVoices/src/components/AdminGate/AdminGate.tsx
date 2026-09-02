import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Enveloppe les pages /admin/* : redirige vers l'accueil silencieusement
// (pas vers /login-required, dont le message ne conviendrait pas à une
// personne connectée mais qui n'est simplement pas admin) plutôt que de
// révéler l'existence de l'espace admin à qui n'y a pas accès.
export default function AdminGate({ children }: { children: ReactNode }) {
    const { isAdmin, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
