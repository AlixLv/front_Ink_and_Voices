export function getBookErrorMessage(status: number): string {
    switch (status) {
        case 404:
            return "Ce livre n'existe pas ou a été supprimé.";
        case 401:
        case 403:
            return "Vous n'avez pas accès à ce livre.";
        case 500:
        case 502:
        case 503:
            return "Le serveur rencontre un problème. Réessayez plus tard.";
        default:
            return "Une erreur est survenue lors du chargement du livre.";
    }
}