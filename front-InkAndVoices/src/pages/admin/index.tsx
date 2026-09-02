import AdminGate from '../../components/AdminGate/AdminGate';
import BackButton from '../../components/BackButton/BackButton';
import CollapsibleSection from '../../components/CollapsibleSection/CollapsibleSection';
import AdminBookRow from '../../components/AdminBookRow/AdminBookRow';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import styles from './index.module.css';

export default function AdminDashboard() {
    const { pending, validated, refused, isLoading, error } = useAdminDashboard();

    return (
        <AdminGate>
            <BackButton />

            {isLoading && <p role="status" className={styles.status}>Chargement...</p>}
            {error && <p role="alert" className={styles.error}>{error}</p>}

            {!isLoading && !error && (
                <div className={styles.sections}>
                    <CollapsibleSection title="En attente de validation" defaultOpen>
                        {pending.length === 0
                            ? <p className={styles.empty}>Aucun livre en attente.</p>
                            : pending.map((book) => <AdminBookRow key={book.id} book={book} />)}
                    </CollapsibleSection>

                    <CollapsibleSection title="Validés" defaultOpen>
                        {validated.length === 0
                            ? <p className={styles.empty}>Aucun livre validé.</p>
                            : validated.map((book) => <AdminBookRow key={book.id} book={book} />)}
                    </CollapsibleSection>

                    <CollapsibleSection title="Refusés" defaultOpen={false}>
                        {refused.length === 0
                            ? <p className={styles.empty}>Aucun livre refusé.</p>
                            : refused.map((book) => <AdminBookRow key={book.id} book={book} />)}
                    </CollapsibleSection>
                </div>
            )}
        </AdminGate>
    )
}
