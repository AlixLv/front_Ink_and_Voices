import { useNavigate } from 'react-router-dom'
import styles from './NavBar.module.css'

const navItems = [
  {
    path: '/',
    label: 'Accueil',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    path: '/search', //TODO: modifier quand le chemin aura été créé
    label: 'Recherche',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    path: `/profile/${user.id}`,
    label: 'Profil',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <>
      {/* Mobile */}
      <nav className={styles.mobileNav} aria-label="Navigation principale">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={styles.navItem}
            aria-label={item.label}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop sidebar */}
      <nav className={styles.desktopNav} aria-label="Navigation principale">
        <div className={styles.brandName}>
          Ink &amp; <span>Voices</span>
        </div>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={styles.navItem}
            aria-label={item.label}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}