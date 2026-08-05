import { Link } from 'react-router-dom';
import styles from './profile.module.css';
import BackButton from '../../components/BackButton/BackButton';
import { useAuth } from '../../contexts/AuthContext';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ContributionsList from '../../components/ContributionsList/ContributionsList';
import SubmitButton from '../../components/SubmitButton/SubmitButton';


export default function Profile() {
    const { username } = useAuth();
    
    return (
        <>
        <BackButton />
            <div>
                <ProfileHeader username={username}/>
            </div>
            <div style={{ marginBottom: '5px' }}>
            <SubmitButton route="/profile/settings" text="Paramètres" />
            </div>
            <div>
            <SubmitButton route="/profile/logout" text="Déconnexion" />
            </div>
            <div>
                <ContributionsList />
            </div>
            <p>
                <Link to="/privacy-policy" className={styles.legalLink}>Politique de confidentialité</Link>
            </p>
        </>
    )
}

