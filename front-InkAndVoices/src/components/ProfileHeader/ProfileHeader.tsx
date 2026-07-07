import sarahImg from "../../assets/sarah.png";
import './ProfileHeader.css';

export default function ProfileHeader() {
    let userName = "Sarah";

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