export class NotFoundTicketException extends Error {
    public readonly httpStatusCode = 404

    constructor() {
        super()
        this.name = NotFoundTicketException.name
        this.message = 'Ticket não encontrado!'
    }
}