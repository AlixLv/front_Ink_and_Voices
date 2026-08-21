import sarahImg from "../../assets/sarah.png";
// import whiteImg from "../../assets/white.png";
// import basicUser from "../../assets/basic-user.png";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import { avatarUrl } from "../../types/User";
import './ProfileHeader.css';

interface ProfileHeaderProps {
    username?: string | null;
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
    const { isAuthenticated, avatar } = useAuth();
    let userName = username ? username : "Utilisateur";

    const profileImage = isAuthenticated ? (avatarUrl(avatar) ?? sarahImg) : logo;

    return (
        <>
            <div className="profile-header-container">
                <div className="profile-user-icon-container">
                    <img src={profileImage} alt="Icône utilisateur" className="profile-user-icon"/>
                </div>
                <div className="profile-user-name">{userName}</div>
            </div>
        </>
    )
}