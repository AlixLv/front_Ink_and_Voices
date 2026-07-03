// vite-plugin-pages scanne src/pages et génère les routes automatiquement
// Dans App.tsx, 'routes' est importé depuis ~react-pages
// Donc la route  '/' correspond à cette homepage

//c'est la racine, dont le visiteur tombe dessus direct, et il peut aller vers /login pour accéder à des droits.

// Cette page est celle d'un user si le user est connecté, mais en vrai, c'est juste une page d'acceuil
// auquelle les visiteurs ont aussi accès. Donc on pourrait la déplacer dans src/pages/

// IL FAUT QUE CETTE PAGE SOIT ACCESSIBLE SANS AUTHENTIFICATION
// ET AUSSI AVEC AUTHENTIFICATION MAIS EN RAJOUTANT DES COMPOSANTS

import UserCardContainer from '../containers/HomeHeaderContainer/HomeHeaderContainer';
import RecentBooksContainer from '../containers/RecentBooksContainer/RecentBooksContainer';
import '../containers/RecentBooksContainer/RecentBooksContainer.css'; // obligé d'importer le css ici car on importe des containers, pas des composants, donc le css doit être appelé dans le coposant où il est utilisé... et ça doit être index.tsx. A voir si on rajoute juste ce titre dans index.css ou si on fait une page à part (au cas où il y aie d'autres styles sur index.tsx)
export default function Homepage() {
    return (
        <>
            <div>
                <UserCardContainer />
            </div>
            <div>
                <RecentBooksContainer />
            </div>
            {/* <div style={{ backgroundColor: 'orange' }}> */}
            <div>
                <UserCardContainer />
            </div>
            <div>
                <RecentBooksContainer />
            </div>
        </>
    )
}

