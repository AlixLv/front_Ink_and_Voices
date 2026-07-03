import { Link } from 'react-router-dom'
import './SubmitButton.css'

interface SubmitButtonProps {
  route: string;
  text: string;
}

export default function SubmitButton({ route, text }: SubmitButtonProps) {
    return (
        <Link to={route}>
            <button className="submit-button">{text}</button>
        </Link>
    )
}