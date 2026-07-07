import { Link } from 'react-router-dom';
import './ThemeButtons.css';



export default function ThemeButtons({ theme }: { theme: string }) {
    return (
    <div>
        <Link to="/theme">
            <button className="theme-button">{theme}</button>
        </Link>
    </div>
    );
}