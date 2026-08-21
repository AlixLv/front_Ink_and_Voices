import './LogoContainer.css';

export default function LogoContainer() {
    return (
        <>
            <div className='logo-container'>
                <img src="/minilogo.svg" alt="" className='logo' />
                <p className='logo-wordmark'>Ink<span aria-hidden="true">&amp;</span>Voices</p>
                <p className='logo-tagline'>The diversity database !</p>
            </div>
        </>
    )
};
