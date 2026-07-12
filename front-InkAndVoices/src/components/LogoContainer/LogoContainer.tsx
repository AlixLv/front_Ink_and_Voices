import './LogoContainer.css';
import logoImg from "../../assets/logo2.svg";

export default function LogoContainer() {
    return (
        <>
            <div className='logo-container'>
                <img src={logoImg} alt="Logo Ink & Voices" className='logo' />
            </div>
        </>
    )
};