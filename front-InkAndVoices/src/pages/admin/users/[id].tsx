import { useParams } from 'react-router-dom';

const Id = () => {
    const { id } = useParams()
    return (
        <>
            <h1>Détail du user {id}</h1>
        </>
    )
}

export default Id;