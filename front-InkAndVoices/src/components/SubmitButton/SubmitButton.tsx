import { Link } from 'react-router-dom'
import './SubmitButton.css'
import type { SubmitButtonProps } from '../../types/Button.tsx'

export default function SubmitButton({ route, text }: SubmitButtonProps) {
    return (
        <Link to={route}>
            <button className="submit-button">{text}</button>
        </Link>
    )
}