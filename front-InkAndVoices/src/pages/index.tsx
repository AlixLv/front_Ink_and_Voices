import HomeHeader from '../components/HomeHeader/HomeHeader';
import RecentBooksList from '../components/RecentBooksList/RecentBooksList';
import '../components/RecentBooksList/RecentBooksList.css'; // obligé d'importer le css ici car on importe des containers, pas des composants, donc le css doit être appelé dans le coposant où il est utilisé... et ça doit être index.tsx. A voir si on rajoute juste ce titre dans index.css ou si on fait une page à part (au cas où il y aie d'autres styles sur index.tsx)
export default function Homepage() {
    return (
        <>
            <div>
                <HomeHeader />
            </div>
            <div>
                <RecentBooksList />
            </div>
        </>
    )
}

