export class InvalidWithdrawRequestException extends Error {
    public readonly httpStatusCode = 400

    constructor() {
        super()
        this.name = InvalidWithdrawRequestException.name
        this.message = 'Dados Inválidos para Saque!'
    }
}

export class InvalidDepositRequestException extends Error {
    public readonly httpStatusCode = 400

    constructor() {
        super()
        this.name = InvalidDepositRequestException.name
        this.message = 'Dados Inválidos para Depósito!'
    }
}