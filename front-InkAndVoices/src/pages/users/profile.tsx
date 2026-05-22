import  { useState, useEffect } from 'react';

const getProfileInfo = async() => {
    const res = await fetch('http://localhost:8032/api/user/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    
    return { status: res.status, data}
}

const ProfileCard = () => {
    const [userData, setUserData] = useState<{username: string, email: string} | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getProfileInfo();
            if (res.status === 200) {
                setUserData(res.data)
            }
        }
        fetchProfile();
    }, []) // [] pour que le useEffect ne s'exécute qu'une seule fois au montage du composant

    if (!userData) return <p>Chargement en cours...</p>

    return (
        <>
            <div>
                <p> Username: { userData.username }</p>
                <p> Email: { userData.email }</p>
            </div>
        </>
    )
}


const Profile = () => {
    return (
        <>
        <h1>Page profile</h1>
        <div>
            Ceci est un test de page profile du user id: {id} 
        </div>
        <ProfileCard />
        </>
    )
}

export default Profile; 