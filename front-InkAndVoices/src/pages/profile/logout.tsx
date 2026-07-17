import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        let cancelled = false;

        // logout() appelle le backend pour expirer le cookie httpOnly : on
        // attend sa réponse avant de rediriger, sinon on annoncerait une
        // déconnexion qui n'a pas encore eu lieu côté serveur.
        const run = async () => {
            await logout();
            if (cancelled) return;
            navigate('/login');
        };
        run();

        return () => { cancelled = true; };
    }, [logout, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>Déconnexion en cours...</h2>
            </div>
        </div>
    );
}