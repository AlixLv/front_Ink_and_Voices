import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types/Book';
import { validateBook } from '../../services/AdminService';
import { HttpError } from '../../services/HttpError';
import '../Auth/AuthForm/AuthForm.css';
import addBookStyles from '../AddBookForm/AddBookForm.module.css';
import styles from './AdminBookDetail.module.css';

interface AdminBookDetailProps {
  book: Book;
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="auth-form-field-group">
    <label className="auth-form-label">{label}</label>
    <div className="auth-form-field">{value}</div>
  </div>
);

export default function AdminBookDetail({ book }: AdminBookDetailProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decide = async (status: 'validated' | 'refused') => {
    setError(null);
    setIsSubmitting(true);

    try {
      await validateBook(book.id, status);
      navigate('/admin');
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError('Impossible de contacter le serveur. Vérifiez votre connexion');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className={addBookStyles.formContainer}>
      <div className={addBookStyles.form}>
        <h1 className={styles.title}>À valider</h1>

        <Field label="Titre" value={book.title} />
        <Field label="Auteurice" value={book.author} />
        <Field label="Maison d'édition" value={book.publishing_house ?? ''} />
        <Field label="Type de document" value={book.type.type_name} />
        <Field label="Thème" value={book.themes.map((theme) => theme.theme_name).join(', ')} />
        <Field label="Année de publication" value={book.publication_year ?? ''} />
        <Field label="Où trouver ce document ?" value={book.reference_link ?? ''} />
        <Field label="Description" value={book.short_description} />

        {error && <p role="alert" className="auth-form-error">{error}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.validateButton}
            onClick={() => decide('validated')}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'En cours...' : 'Valider'}
          </button>
          <button
            type="button"
            className={styles.refuseButton}
            onClick={() => decide('refused')}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'En cours...' : 'Refuser'}
          </button>
        </div>
      </div>
    </div>
  );
}
