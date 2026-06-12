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
    }, [])

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
            Page profile en construction
        </div>
        <ProfileCard />
        </>
    )
}

export default Profile; 