import BackButton from '../components/BackButton/BackButton';
import styles from './placeholder.module.css';

export default function Genres() {
  return (
    <main className={styles.page}>
      <BackButton />
      <h1>Genres</h1>
      <p>Cette page est en cours. Vous trouverez bientôt ici les livres classés par genre.</p>
    </main>
  );
}
