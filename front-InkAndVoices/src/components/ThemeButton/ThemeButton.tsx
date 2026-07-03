import { Link } from 'react-router-dom';
import './ThemeButton.css';

export default function ThemeButton() {
    return (
    <div>
        <Link to="/theme">
            <button className="theme-button">thème</button>
        </Link>
    </div>
    );
}