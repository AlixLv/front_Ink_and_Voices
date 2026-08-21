import { useState } from 'react';
import type { FormEvent } from 'react';
import BackButton from '../components/BackButton/BackButton';
import BooksList from '../components/BookList/BooksList';
import SubmitButton from '../components/SubmitButton/SubmitButton';
import styles from './placeholder.module.css';
import '../components/Auth/AuthForm/AuthForm.css';

export default function Search() {
  const [query, setQuery] = useState<string>('');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

  return (
    <main className={styles.page}>
      <BackButton />
      <h1>Recherche</h1>
      <form onSubmit={handleSubmit} role="search">
        <div className="auth-form-field-group">
          <label className="auth-form-label">
            Titre ou autrice / auteur
            <input
              className="auth-form-field"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <SubmitButton text="Rechercher" type="submit" />
      </form>
      {submittedQuery === '' && (
        <div className="empty-state">
          <img src="/minilogo.svg" alt="" />
          <p>Cherchez un livre par son titre ou le nom de son autrice ou auteur.</p>
        </div>
      )}
      {submittedQuery !== '' && (
        <section aria-live="polite">
          <h2>Résultats pour « {submittedQuery} »</h2>
          <BooksList filters={{ search: submittedQuery }} />
        </section>
      )}
    </main>
  );
}
