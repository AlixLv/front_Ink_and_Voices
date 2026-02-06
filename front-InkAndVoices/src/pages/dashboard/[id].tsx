import { useParams } from 'react-router-dom';

const Id = () => {
    const { id } = useParams()
    return (
        <>
        <h1>Dashboard</h1>
        <div>
            Ceci est un test de dashboard d'admin.
            ID dynamique pour le dashboard - ID: {id}
        </div>
        </>
    )
}

export default Id; 