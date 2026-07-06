import sarahImg from "../../assets/sarah.png";
import './ProfileHeaderContainer.css';

export default function ProfileHeaderContainer() {
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