// Erreur HTTP "métier" : le fetch a abouti, mais le backend a répondu avec un
// code d'erreur (4xx/5xx). On transporte le status ET le corps de la réponse
// pour que le hook puisse choisir le bon message à afficher.
// Le message ("HTTP error. status: 409") est ce que vérifient les tests du service.

export class HttpError extends Error {
    status: number;
    data: unknown;

    constructor(status: number, data: unknown) {
        const message = HttpError.extractMessage(data, status);
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.data = data;
    }

    private static extractMessage(data: unknown, status: number): string {
        if (
            // vérification que data est de type object et a une clé message
            typeof data == 'object' && data !== null &&
            // vérification que la clé message est bien de type string
            'message' in data && typeof (data as { message: unknown }).message === 'string'
        ){
            return (data as { message: string}).message;
        }
        return `HTTP error. status: ${status}`;
    }
}