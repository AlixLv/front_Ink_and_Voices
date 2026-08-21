import BackButton from '../components/BackButton/BackButton';
import styles from './placeholder.module.css';

export default function Search() {
  return (
    <main className={styles.page}>
      <BackButton />
      <h1>Recherche</h1>
      <p>Cette page est en cours. Vous trouverez bientôt ici une page de recherche de livres.</p>
    </main>
  );
}
