import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import BooksList from '../components/BookList/BooksList';
import { getTypes } from '../services/BookService';
import type { Type } from '../types/Book';
import styles from './placeholder.module.css';
import '../components/ThemeButtons/ThemeButtons.css';

export default function Genres() {
  const [types, setTypes] = useState<Type[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId = Number(searchParams.get('id')) || null;
  const selectedType = types.find((type) => type.id === selectedId);

  useEffect(() => {
    let isMounted = true;
    getTypes()
      .then((data) => { if (isMounted) setTypes(data); })
      .catch(() => { if (isMounted) setError('Impossible de charger les genres.'); });
    return () => { isMounted = false; };
  }, []);

  return (
    <main className={styles.page}>
      <BackButton />
      <h1>Genres</h1>
      {error && <p role="alert">{error}</p>}
      <nav aria-label="Genres disponibles">
        <div className="theme-list">
          {types.map((type) => (
            <button
              key={type.id}
              type="button"
              className="theme-button"
              aria-pressed={type.id === selectedId}
              onClick={() => setSearchParams({ id: String(type.id) })}
            >
              {type.type_name}
            </button>
          ))}
        </div>
      </nav>
      {selectedType && (
        <section aria-live="polite">
          <h2>Livres du genre {selectedType.type_name}</h2>
          <BooksList filters={{ type_id: selectedType.id }} />
        </section>
      )}
      {!selectedType && <p>Choisissez un genre pour afficher les livres correspondants.</p>}
    </main>
  );
}
