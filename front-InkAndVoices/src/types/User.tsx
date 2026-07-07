export interface User {
    uuid: string;
    email: string;
    username: string;
}

// à utiliser pour la UserCard qui affiche les infos du user dans page profil
export interface UserCardProps {
    user: User;
}

export interface SignUpResponse {
    email: string;
    username: string;
}

export interface ApiError {
    message: string;
}

export interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    global?: string;
}
