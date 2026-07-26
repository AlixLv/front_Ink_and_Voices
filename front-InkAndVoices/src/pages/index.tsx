import HomeHeader from '../components/HomeHeader/HomeHeader';
import NavBar from '../components/NavBar/NavBar';
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
            <div>
                <NavBar />
            </div>
        </>
    )
}

