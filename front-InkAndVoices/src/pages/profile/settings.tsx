import SubmitButton from "../../components/SubmitButton/SubmitButton";

export default function Settings() {
    return (
        <>
            <div>
                <SubmitButton route="/" text="Modifier ses identifiants" />
            </div>
            <div>
                <SubmitButton route="/logout" text="Se déconnecter" />
            </div>
        </>
    )
}

