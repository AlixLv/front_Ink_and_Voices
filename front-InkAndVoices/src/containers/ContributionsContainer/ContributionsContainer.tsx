import "./ContributionsContainer.css"
import ContributionsList from "./ContributionsList";

//est-ce qu'on ferait pas juste un gros dossier avec contributions?

export default function ContributionsContainer() {
    return (
        <>
            <div>
                <h1 className="contributions-title">Tes contributions</h1>
            </div>
            <div>
                <ContributionsList />
            </div>
        </>
    )
}