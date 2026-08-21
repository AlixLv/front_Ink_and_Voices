import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/BackButton/BackButton';
import AddBookForm from '../components/AddBookForm/AddBookForm';

export default function AddBook() {
    const { isAuthenticated, isLoading } = useAuth();

    // Tant qu'on ne sait pas encore si la personne est connectée, on n'affiche
    // rien plutôt que de rediriger au hasard (même logique que la navbar).
    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login-required" replace />;
    }

    return (
        <>
            <BackButton />
            <h1>Proposer un livre</h1>
            <AddBookForm />
        </>
    );
}
