import HomeHeader from '../components/HomeHeader/HomeHeader';
import RecentBooksList from '../components/RecentBooksList/RecentBooksList';
import '../components/RecentBooksList/RecentBooksList.css'; 
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

