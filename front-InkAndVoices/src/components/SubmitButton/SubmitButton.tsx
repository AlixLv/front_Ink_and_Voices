import { Link } from 'react-router-dom'
import './SubmitButton.css'
import type { SubmitButtonProps } from '../../types/Button.tsx'

export default function SubmitButton({ 
  text, 
  type = 'button', 
  disabled = false, 
  onClick,
  route 
}: SubmitButtonProps) {
  // Si c'est un lien (route fournie)
  if (route) {
    return (
      <Link to={route}>
        <button className="submit-button">{text}</button>
      </Link>
    )
  }

  // Si c'est un bouton de formulaire
  return (
    <button 
      className="submit-button" 
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}