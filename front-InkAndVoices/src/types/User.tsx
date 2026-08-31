export interface User {
    uuid: string;
    email: string;
    username: string;
}

// à utiliser pour la UserCard qui affiche les infos du user dans page profil
export interface UserCardProps {
    user: User;
}

export interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    global?: string;
}


export interface ApiError {
    message: string;
}

export interface SignUpResponse {
    status: number;
    data: SignedUserDatas;
}

export interface SignedUserDatas {
    email: string;
    username: string;
}

// Le login ne renvoie que email/username (même forme que SignedUserDatas) :
// pas d'id ici, c'est /me (LoggedUserDatas) qui fait foi pour l'identité.
export interface LoginResponse {
    status: number;
    data: SignedUserDatas;
}

// Forme de la réponse de GET /api/users/me ("qui suis-je ?"), pas celle du
// login : c'est la seule route qui renvoie un id, car c'est la seule qui doit
// dire "voici qui tu es" (elle sert à AuthContext pour bâtir /profile/:id
// dans la navbar). Pas de `token` ici : il vit uniquement dans le cookie
// httpOnly posé par le backend, invisible depuis JS.
export type Role = 'user' | 'admin';

export interface LoggedUserDatas {
    id: string;
    email: string;
    username: string;
    role: Role;
}

