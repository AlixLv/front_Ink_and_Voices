import { Link } from 'react-router-dom'
import './SubmitButton.css'

export default function SubmitButton() {
    return (
        <Link to="/add-book">
            <button className="submit-button">
                Ajouter un livre
            </button>
        </Link>
    )
}