// Erreur HTTP "métier" : le fetch a abouti, mais le backend a répondu avec un
// code d'erreur (4xx/5xx). On transporte le status ET le corps de la réponse
// pour que le hook puisse choisir le bon message à afficher.
// Le message ("HTTP error. status: 409") est ce que vérifient les tests du service.
export class HttpError extends Error {
    status: number;
    data: unknown;
    constructor(status: number, data: unknown) {
        super(`HTTP error. status: ${status}`);
        this.name = 'HttpError';
        this.status = status;
        this.data = data;
    }
}