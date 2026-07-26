import { useNavigate } from 'react-router-dom'
import styles from './NavBar.module.css'
import { useAuth } from '../../contexts/AuthContext'

type NavItem = {
  key: string
  label: string
  icon: React.ReactNode
  onClick: () => void
}

export default function NavBar() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, id } = useAuth()

  // Tant qu'on ne sait pas encore si la personne est connectée (requête /me
  // en cours), on ignore le clic plutôt que de la rediriger au hasard.
  const goToProfile = () => {
    if (isLoading) return
    navigate(isAuthenticated ? `/profile/${id}` : '/login-required')
  }

  const navItems: NavItem[] = [
    {
      key: '/',
      label: 'Accueil',
      onClick: () => navigate('/'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      key: '/search', //TODO: modifier quand le chemin aura été créé
      label: 'Recherche',
      onClick: () => navigate('/search'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      key: 'profile',
      label: 'Profil',
      onClick: goToProfile,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Mobile */}
      <nav className={styles.mobileNav} aria-label="Navigation principale">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={item.onClick}
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
            key={item.key}
            onClick={item.onClick}
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