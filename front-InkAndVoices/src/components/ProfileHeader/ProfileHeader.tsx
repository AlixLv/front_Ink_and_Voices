import sarahImg from "../../assets/sarah.png";
import './ProfileHeader.css';

interface ProfileHeaderProps {
    username?: string | null;
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
    let userName = username ? username : "Utilisateur";

    return (
        <>
            <div className="profile-header-container">
                <div className="profile-user-icon-container">
                    <img src={sarahImg} alt="Icône utilisateur" className="profile-user-icon"/>
                </div>
                <div className="profile-user-name">{userName}</div>
            </div>
        </>
    )
}