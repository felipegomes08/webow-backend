export class InvalidUserStatusException extends Error {
    public readonly httpStatusCode = 400

    constructor() {
        super()
        this.name = InvalidUserStatusException.name
        this.message = 'O status do usuário é inválido!'
    }
}

export class InvalidUserTypeException extends Error {
    public readonly httpStatusCode = 400

    constructor() {
        super()
        this.name = InvalidUserTypeException.name
        this.message = 'O tipo do usuário é inválido!'
    }
}

export class InvalidAccountTypeException extends Error {
    public readonly httpStatusCode = 400

    constructor() {
        super()
        this.name = InvalidAccountTypeException.name
        this.message = 'O tipo de conta é inválido!'
    }
}

export class CpfAlreadyExistsException extends Error {
    public readonly httpStatusCode = 409

    constructor() {
        super()
        this.name = CpfAlreadyExistsException.name
        this.message = 'Já existe um usuário com este CPF!'
    }
}

export class EmailAlreadyExistsException extends Error {
    public readonly httpStatusCode = 409

    constructor() {
        super()
        this.name = EmailAlreadyExistsException.name
        this.message = 'Já existe um usuário com esse e-mail!'
    }
}

export class NotFoundUserException extends Error {
    public readonly httpStatusCode = 404

    constructor() {
        super()
        this.name = NotFoundUserException.name
        this.message = 'Usuário não encontrado!'
    }
}