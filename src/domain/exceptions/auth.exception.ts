export class InvalidAuthException extends Error {
    public readonly httpStatusCode = 400

    constructor() {
        super()
        this.name = InvalidAuthException.name
        this.message = 'Email ou senha inválido!'
    }
}

export class InvalidRefreshTokenException extends Error {
    public readonly httpStatusCode = 400

    constructor() {
        super()
        this.name = InvalidRefreshTokenException.name
        this.message = 'Refresh Token Inválido!'
    }
}