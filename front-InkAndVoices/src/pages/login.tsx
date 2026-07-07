import LogoContainer from "../components/LogoContainer/LogoContainer";

export default function Login() {
  return (
    <>
        <LogoContainer />
    </>
  )
}








// Je dois mettre un formulaire, donc créer des composants.
// Ensuite, les champs de ces formulaires vont utiliser des hooks liés à un Login Service qui va executer une requête POST.
// Ca va vérifier si c'est identique à ce qu'il y a en DB (truc statique pour l'instant) et si c'est ok, ça connecte. Ca renvoie un JWT.