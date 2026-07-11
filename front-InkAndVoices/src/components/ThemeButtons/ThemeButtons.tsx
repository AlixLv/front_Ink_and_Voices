import { Link } from 'react-router-dom';
import './ThemeButtons.css';
import type { Theme } from '../../types/Book';



export default function ThemeButtons({ themes }: { themes: Theme[] }) {
    return (
    <div>
        {themes.map((theme) => (
            <Link to="/theme" key={theme.id}>
                <button className="theme-button">{theme.theme_name}</button>
            </Link>
        ))}
    </div>
    );
}