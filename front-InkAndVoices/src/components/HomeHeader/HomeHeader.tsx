import SubmitButton from "../SubmitButton/SubmitButton.tsx";
import './HomeHeader.css';
import sarahImg from "../../assets/sarah.png";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { Link } from "react-router-dom";



export default function HomeHeader() {
    const { username, id, isAuthenticated } = useAuth();
    const displayName = isAuthenticated && username ? username : "Utilisateur";

    return (
        <>
            <div className="home-card-container">
                {isAuthenticated ? (
                    <div className="user-card">
                        <div className="user-icon-container">
                            <Link to={`/profile/${id}`}>
                                <img src={sarahImg} alt="Icône utilisateur" className="user-icon" />
                            </Link>
                        </div>
                        <div className="user-name">Hey {displayName} !!!</div>
                    </div>
                ) : (
                    <div className="welcome-section">
                        <img src="/minilogo.svg" alt="" className="welcome-logo" />
                        <p className="welcome-wordmark">Ink<span aria-hidden="true">&amp;</span>Voices</p>
                        <p className="welcome-tagline">The diversity database !</p>
                    </div>
                )}
                <div className="submit-button-container">
                    <SubmitButton route="/add-book" text="Ajouter un livre" />
                </div>
            </div>
        </>
    )
}
