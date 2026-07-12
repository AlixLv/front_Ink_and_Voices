import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        // Déconnecter l'utilisateur
        logout();
        console.log('✅ Utilisateur déconnecté');
        
        // Rediriger vers la page de login après 1 seconde
        const timer = setTimeout(() => {
            navigate('/login');
        }, 1000);

        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>Déconnexion en cours...</h2>
            </div>
        </div>
    );
}