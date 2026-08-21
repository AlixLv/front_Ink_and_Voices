import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BackButton from '../../components/BackButton/BackButton';
import AddBookForm from '../../components/AddBookForm/AddBookForm';

export default function EditBook() {
    const { id } = useParams();
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login-required" replace />;
    }

    const bookId = Number(id);
    if (!bookId) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <BackButton />
            <h1>Modifier ma suggestion</h1>
            <AddBookForm bookId={bookId} />
        </>
    );
}
