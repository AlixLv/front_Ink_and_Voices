import UserAvatar from '../UserAvatar/UserAvatar';
import './ProfileHeader.css';

interface ProfileHeaderProps {
    username?: string | null;
}

export default function ProfileHeader({ username }: ProfileHeaderProps) {
    const userName = username ? username : "Utilisateur";

    return (
        <>
            <div className="profile-header-container">
                <UserAvatar username={userName} size={100} />
                <div className="profile-user-name">{userName}</div>
            </div>
        </>
    )
}
