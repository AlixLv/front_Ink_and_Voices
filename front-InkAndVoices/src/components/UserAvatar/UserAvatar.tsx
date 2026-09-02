import './UserAvatar.css';

interface UserAvatarProps {
    username: string;
    size?: number;
}

// Palette dédiée à l'avatar, vérifiée à ~4.5:1+ de contraste avec du texte
// blanc/#F5F5F5 (WCAG AA). Réutilise les deux couleurs déjà établies dans
// l'app (rose/rouge) plutôt que d'en inventer un jeu totalement à part.
const AVATAR_COLORS = ['#C2185B', '#1565C0', '#2E7D32', '#6A1B9A', '#C0392B', '#00695C'];

// Couleur dérivée du pseudo lui-même (pas aléatoire à chaque rendu) : la
// même personne garde toujours la même couleur.
function colorForUsername(username: string): string {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = (hash * 31 + username.charCodeAt(i)) | 0;
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

export default function UserAvatar({ username, size = 100 }: UserAvatarProps) {
    const initial = username.charAt(0).toUpperCase();
    const backgroundColor = colorForUsername(username);

    return (
        <div
            className="user-avatar"
            aria-hidden="true"
            style={{
                width: size,
                height: size,
                fontSize: size * 0.4,
                backgroundColor,
            }}
        >
            {initial}
        </div>
    );
}
