import SubmitButton from "../SubmitButton/SubmitButton.tsx";
import './HomeHeader.css';
import sarahImg from "../../assets/sarah.png";
import { useAuth } from "../../contexts/AuthContext.tsx";



export default function HomeHeader() {
    const { username } = useAuth();
    const displayName = username || "Sarah";

    return (
        <>
            <div className="home-card-container">
                <div className="user-card">
                    <div className="user-icon-container">
                        <img src={sarahImg} alt="Icône utilisateur" className="user-icon" />
                    </div>
                    <div className="user-name">Hey {displayName} !!!</div>
                </div>
                <div className="submit-button-container">
                    <SubmitButton route="/add-book" text="Ajouter un livre" />
                </div>
            </div>
        </>
    )
}