import ContributionCard from '../ContributionCard/ContributionCard';
import './ContributionsList.css';


export default function ContributionList() {
  return (
    <>
      <div>
          <h1 className="contributions-title">Tes contributions</h1>
      </div>
      <div className="contributions-list">

       {/* J'ai mis plein de ContributionsCards pour avoir un rendu visuel, mais il faudrait faire un truc comme books.map(), comme dans BooksList.tsx! */}
        <ContributionCard />
        <ContributionCard />
        <ContributionCard />     
        <ContributionCard />
        <ContributionCard />
        <ContributionCard />  
        <ContributionCard />
        <ContributionCard />
        <ContributionCard />   
          <ContributionCard />
        <ContributionCard />
        <ContributionCard />    
          <ContributionCard />
        <ContributionCard />
        <ContributionCard />     
    </div>
    </>
  );
}

// De mes vagues souvenirs, on avait dit qu'un livre qui avait été soumis à validtaion mais pas encore validé était une "contribution" (ou je sais plus le nom qu'on avait choisi, voir diagrammes du début d'année), et pas un "livre". Il n'est pas dans la table livre. 
// Les "livres" n'ont pas de user lié (pas de user qui les aurait soumis) mais les contributions si. Est-ce que la table contribution est bien à jour? Et est-ce qu'on a des contributions côté seed en backend, côté type Prisma etc?

// Dans tous les cas il faudrait faire un ContributionService qui renvoit des fausses contributions en attendant, histoire de mettre en place la logique API, la boucle dans le composant etc