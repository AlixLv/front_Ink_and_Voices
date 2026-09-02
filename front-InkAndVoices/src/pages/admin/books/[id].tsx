import { useParams } from 'react-router-dom';
import AdminGate from '../../../components/AdminGate/AdminGate';
import BackButton from '../../../components/BackButton/BackButton';
import AdminBookDetail from '../../../components/AdminBookDetail/AdminBookDetail';
import { useSingleBook } from '../../../hooks/useSingleBook';
import styles from './id.module.css';

export default function AdminBookDetailPage() {
    const { id } = useParams<{ id: string }>();
    const bookId = Number(id);

    if (!id || Number.isNaN(bookId)) {
        return <p className={styles.message}>Identifiant de livre invalide</p>;
    }

    return (
        <AdminGate>
            <AdminBookDetailPageContent bookId={bookId} />
        </AdminGate>
    );
}

function AdminBookDetailPageContent({ bookId }: { bookId: number }) {
    const { book, isLoading, error } = useSingleBook(bookId);

    return (
        <>
            <BackButton />
            {isLoading && <p role="status" className={styles.message}>Chargement...</p>}
            {error && <p role="alert" className={styles.message}>Erreur : {error}</p>}
            {!isLoading && !error && !book && <p className={styles.message}>Ce livre n'existe pas.</p>}
            {book && <AdminBookDetail book={book} />}
        </>
    );
}
