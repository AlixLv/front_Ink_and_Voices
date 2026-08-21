import BackButton from '../components/BackButton/BackButton';
import styles from './placeholder.module.css';

export default function Theme() {
  return (
    <main className={styles.page}>
      <BackButton />
      <h1>Thèmes</h1>
      <p>Cette page est en cours. Vous trouverez bientôt ici les livres selon le thème choisi.</p>
    </main>
  );
}
