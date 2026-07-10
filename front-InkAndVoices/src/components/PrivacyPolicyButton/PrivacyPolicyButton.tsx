import { useNavigate } from 'react-router-dom'
import styles from './PrivacyPolicyButton.module.css'

type Props = {
  className?: string
}

export default function PrivacyPolicyButton({ className }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/privacy-policy')}
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      Politique de confidentialité
    </button>
  )
}