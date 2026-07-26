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
    data: SignedUserDatas | ApiError;
}

export interface SignedUserDatas {
    email: string;
    username: string;
}

// Le login ne renvoie que email/username (même forme que SignedUserDatas) :
// pas d'id ici, c'est /me (LoggedUserDatas) qui fait foi pour l'identité.
export interface LoginResponse {
    status: number;
    data: SignedUserDatas | ApiError;
}

// Pas de `token` ici : il vit uniquement dans le cookie httpOnly posé par le
// backend, invisible depuis JS. Le front ne manipule que des infos d'affichage.
export interface LoggedUserDatas {
    id: string;
    email: string;
    username: string;
}

