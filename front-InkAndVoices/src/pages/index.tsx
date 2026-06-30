// vite-plugin-pages scanne src/pages et génère les routes automatiquement
// Dans App.tsx, 'routes' est importé depuis ~react-pages
// Donc la route  '/' correspond à cette homepage

//c'est la racine, dont le visiteur tombe dessus direct, et il peut aller vers /login pour accéder à des droits.

// Cette page est celle d'un user si le user est connecté, mais en vrai, c'est juste une page d'acceuil
// auquelle les visiteurs ont aussi accès. Donc on pourrait la déplacer dans src/pages/

// IL FAUT QUE CETTE PAGE SOIT ACCESSIBLE SANS AUTHENTIFICATION
// ET AUSSI AVEC AUTHENTIFICATION MAIS EN RAJOUTANT DES COMPOSANTS

import { Link } from 'react-router-dom';
import BooksContainer from '../containers/BooksContainer';

export default function Homepage() {
    return (
        <>
            <div style={{ backgroundColor: 'lightblue' }}>
                <Link to="/profile">
                    <p>PHOTO</p> <p> Hey Sarah !!!</p>
                </Link>
                                <Link to="/submit">
                    <button className="button">Ajouter un livre</button>
                </Link>
            </div>
            {/* <div style={{ backgroundColor: 'orange' }}> */}
            <div>
                <BooksContainer />
            </div>

        </>
    )
}

