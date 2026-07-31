import BackButton from '../components/BackButton/BackButton'
import LogoContainer from '../components/LogoContainer/LogoContainer'
import SubmitButton from '../components/SubmitButton/SubmitButton'
import styles from './login-required.module.css'

export default function LoginRequired() {
  return (
    <div className={styles.container}>
      <BackButton />
      <LogoContainer />
      <p className={styles.message}>
        Vous devez être connecté·e pour accéder à cette page.
      </p>
      <SubmitButton text="S'inscrire" route="/signup" />
      <SubmitButton text="Se connecter" route="/login" />
    </div>
  )
}
