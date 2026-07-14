import { Link } from 'react-router-dom';
import './ThemeButtons.css';
import type { Theme } from '../../types/Book';

export default function ThemeButtons({ themes }: { themes: Theme[] }) {
  return (
    <div className="theme-list">
      {themes.map((theme) => (
        <Link to="/theme" key={theme.id} className="theme-button">
          {theme.theme_name}
        </Link>
      ))}
    </div>
  );
}