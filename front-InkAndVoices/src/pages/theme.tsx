import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import BooksList from '../components/BookList/BooksList';
import { getThemes } from '../services/BookService';
import type { Theme } from '../types/Book';
import styles from './placeholder.module.css';
import '../components/ThemeButtons/ThemeButtons.css';

export default function ThemePage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId = Number(searchParams.get('id')) || null;
  const selectedTheme = themes.find((theme) => theme.id === selectedId);

  useEffect(() => {
    let isMounted = true;
    getThemes()
      .then((data) => { if (isMounted) setThemes(data); })
      .catch(() => { if (isMounted) setError('Impossible de charger les thèmes.'); });
    return () => { isMounted = false; };
  }, []);

  return (
    <main className={styles.page}>
      <BackButton />
      <h1>Thèmes</h1>
      {error && <p role="alert">{error}</p>}
      <nav aria-label="Thèmes disponibles">
        <div className="theme-list">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className="theme-button"
              aria-pressed={theme.id === selectedId}
              onClick={() => setSearchParams({ id: String(theme.id) })}
            >
              {theme.theme_name}
            </button>
          ))}
        </div>
      </nav>
      {selectedTheme && (
        <section aria-live="polite">
          <h2>Livres sur le thème {selectedTheme.theme_name}</h2>
          <BooksList filters={{ theme_id: selectedTheme.id }} />
        </section>
      )}
      {!selectedTheme && <p>Choisissez un thème pour afficher les livres correspondants.</p>}
    </main>
  );
}
