import type { FormErrors, ApiError } from '../types/User.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../services/AuthService.tsx';

export const useSignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

//     const [formData, setFormData] = useState<SignUpFormData>({
//     username: "",
//     email: "",
//     password: ""
// });
// const [errors, setErrors] = useState<FormErrors>({});
// const [isLoading, setIsLoading] = useState<boolean>(false);
    
// les données user, les erreurs et le loading ont des cycles de vie différents, donc ils doivent être dans des états séparés askip;

    // logique métier du formulaire
    const validateInputs = (): FormErrors => {
        const newErrors: FormErrors = {};

// pour chaque form, on doit vérifier que le champ n'est aps vide. S'il ne l'eest pas, alors on vérifie les conditions
        if (username.length <= 0){
            newErrors.username = "Le nom d'utilisateurice ne doit pas être vide."
        } // on doit aussi vérifier la longueur max qu'on a déclaré en backend sur le schema prisma et vérifier que ce username est unique

        if (!email.includes('@')){
            newErrors.email = "L'adresse email n'est pas valide.";
        } // c'est pas le msg d'erreur affiché dans la vidéo. On doit avoir un message natif web je crois
        // d'autant plus important de faire des tests pour vérifier que ça ne passe pas si les conditiosn en sont pas respectées et qu'on a les noms msgs d'erreurs affichés

        if (password.length < 8){
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        return newErrors;
    };
    
    // fonction appelant le AuthService
    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault(); 
        setErrors({});

        const validationErrors = validateInputs();
            if(Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return; // pas d'envoi de la requête si les inputs du formulaire sont invalides
        }

        setIsLoading(true);
        
        try {
            const response = await signUpUser(username, email, password);
            // on renvoie le password en clair au backend. Le backend hash le password avant de le stocker, mais est-ce qu'il n'y a pas un risque qu'il soit intercepté pendant le transport?
            //  omment sécuriser ça? On doit jamais sécuriser que le backend


            if (response.status === 201){
                navigate(`/login`);
                return;
            }

            // Conflit: user/email déjà existant
            if (response.status === 409){
                setErrors({global: (response.data as ApiError).message}); 
                return;
            }

            // Erreur de validation : JSON invalide, type attendu incorrect, caractères iterdits... normalement le front gère déjà la validation
            if (response.status === 400 ){
                setErrors({global: "Les données entrées ne sont pas valides."});
                return;
            }

            // Erreur serveur : backend cassé donc db inexistante, hash du password qui échoue, serveur, var d'environnement manquantes...
            if (response.status >= 500){
                setErrors({global: "Erreur serveur. Veuillez réessayer plus tard."});
                return;
            }

        } catch (error) {
            setErrors({global: "Une erreur est survenue, réessayer plus tard"});
            // pas assez spécifique, mais askip il faut pas trop divulguer des infos??
        } finally {
            setIsLoading(false);
        }
    };

    // renvoi uniquement les info dont à besoin le component
    // Le composant ne doit pas avoir accès aux setters individuels. Il faut exposer le moins de code possible
    // copilot propose : 
//     return {
//     formData: { username, email, password },
//     errors,
//     isLoading,
//     handleInputChange: (field, value) => { /* ... */ },
//     handleSubmit
// }
// ou il dit que si le hook gère tout, on peut juste renvoyer pareil sans les setters

// si un composant a accès à des setters, un hacker peut modifier les données du formulaire sans passer par la validation. Donc on ne renvoie pas les setters, on renvoie juste les valeurs et la fonction handleSubmit. Le composant peut gérer les changements d'input en interne, mais il ne peut pas modifier directement les valeurs du hook.


// copilot dit qu'en fait le composant a besoin des setters. Donc on doit lui renvoyer quand même, mais on peut refactorer:
// const handleInputChange = (field: keyof SignUpFormData, value: string) => {
//     if (field === 'username') setUsername(value);
//     if (field === 'email') setEmail(value);
//     if (field === 'password') setPassword(value);
// };

// return {
//     username, email, password,
//     errors, isLoading, handleSubmit,
//     handleInputChange  // ← Une seule fonction au lieu de 3 setters
// }
// mais que c'est pas nécéssaire sur une si petite app
    return {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        errors,
        isLoading,
        handleSubmit
    }

}