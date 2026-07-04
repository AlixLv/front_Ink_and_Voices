import SubmitButton from "../../components/SubmitButton/SubmitButton.tsx";
import './HomeHeaderContainer.css';
import sarahImg from "../../assets/sarah.png";



export default function UserCardContainer() {
    let userName = "Sarah";

    return (
        <>
            <div className="home-card-container">
                <div className="user-card">
                    <div className="user-icon-container">
                        <img src={sarahImg} alt="Icône utilisateur" className="user-icon" />
                    </div>
                    <div className="user-name">Hey {userName} !!!</div>
                </div>
                <div className="submit-button-container">
                    <SubmitButton route="/add-book" text="Ajouter un livre" />
                </div>
            </div>
        </>
    )
}