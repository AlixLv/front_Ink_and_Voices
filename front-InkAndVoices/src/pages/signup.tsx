import SignUpForm from '../components/SignUpForm/SignUpForm';

// rajouter le css
// il faut refactorer en un seul form le login et le signup (sinon c'ets pas react logic)

export default function Authenticate() {
    return (
        <>
            <h1>Se créer un compte</h1>
            <SignUpForm />
        </>
    )
}
