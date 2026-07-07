import { useParams } from 'react-router-dom';

const Profile = () => {
    const {id} = useParams();
    return (
        <>
        <h1>Page profile</h1>
        <div>
            Ceci est un test de page profile du user id: {id}
        </div>
        </>
    )
}

export default Profile; 