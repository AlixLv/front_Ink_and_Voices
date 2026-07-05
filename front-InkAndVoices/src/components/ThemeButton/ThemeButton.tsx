import { Link } from 'react-router-dom';
import type { Theme } from '../../types/Book';
import './ThemeButton.css';

export default function ThemeButton({ theme }: { theme: Theme }) {
    return (
    <div>
        <Link to="/theme">
            <button className="theme-button">{theme.theme_name}</button>
        </Link>
    </div>
    );
}