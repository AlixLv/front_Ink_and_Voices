import SubmitButton from "../../components/SubmitButton/SubmitButton";
import BackButton from "../../components/BackButton/BackButton";

export default function Settings() {
    return (
        <>
            <BackButton />
            <div>
                <SubmitButton text="Modifier ses identifiants" />
            </div>
        </>
    )
}

