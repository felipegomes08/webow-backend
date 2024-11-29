import { IAccountType, IUser, IUserStatus, IUserType } from "@interfaces/user";

export class User implements IUser {
    private _id: string;
    private _name: string;
    private _cpf: string;
    private _phone: string;
    private _email: string;
    private _uf: string;
    private _pixKey: string;
    private _password: string;
    private _affiliateId: string | null;
    private _accountTypeId: string;
    private _accountType?: IAccountType | null;
    private _userTypeId: string;
    private _userType?: IUserType | null;
    private _balance: number;
    private _statusId: string;
    private _status?: IUserStatus | null;
    private _accessToken?: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(data: IUser) {
        this._id = data.id!;
        this._name = data.name;
        this._cpf = data.cpf;
        this._phone = data.phone;
        this._email = data.email;
        this._uf = data.uf;
        this._pixKey = data.pixKey;
        this._password = data.password;
        this._affiliateId = data.affiliateId;
        this._accountTypeId = data.accountTypeId;
        this._userTypeId = data.userTypeId;
        this._statusId = data.statusId;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._balance = data.balance;
        this._accountType = data.accountType;
        this._userType = data.userType;
        this._status = data.status;
        this._accessToken = data.accessToken;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get cpf(): string {
        return this._cpf;
    }

    set cpf(value: string) {
        this._cpf = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get uf(): string {
        return this._uf;
    }

    set uf(value: string) {
        this._uf = value;
    }

    get pixKey(): string {
        return this._pixKey;
    }

    set pixKey(value: string) {
        this._pixKey = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get affiliateId(): string | null {
        return this._affiliateId;
    }

    set affiliateId(value: string | null) {
        this._affiliateId = value;
    }

    get accountTypeId(): string {
        return this._accountTypeId;
    }

    set accountTypeId(value: string) {
        this._accountTypeId = value;
    }

    get accountType(): IAccountType | undefined | null {
        return this._accountType;
    }

    set accountType(value: IAccountType | undefined) {
        this._accountType = value;
    }

    get userTypeId(): string {
        return this._userTypeId;
    }

    set userTypeId(value: string) {
        this._userTypeId = value;
    }

    get userType(): IUserType | undefined | null {
        return this._userType;
    }

    set userType(value: IUserType | undefined) {
        this._userType = value;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }

    get statusId(): string {
        return this._statusId;
    }

    set statusId(value: string) {
        this._statusId = value;
    }

    get status(): IUserStatus | undefined | null {
        return this._status;
    }

    set status(value: IUserStatus | undefined) {
        this._status = value;
    }

    get accessToken(): string | undefined {
        return this._accessToken;
    }

    set accessToken(value: string | undefined) {
        this._accessToken = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
}

