import { Link, useParams } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = () => {
    const {id} = useParams();
    return (
        <>
        <h1>Page profile</h1>
        <div>
            Ceci est un test de page profile du user id: {id}
        </div>
        <p>
            <Link to="/privacy-policy" className={styles.legalLink}>Politique de confidentialité</Link>
        </p>
        </>
    )
}

export default Profile; 