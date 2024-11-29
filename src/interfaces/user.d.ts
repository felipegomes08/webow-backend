export interface IUserType {
    readonly id?: string;
    name: string;
    label: string;
}

export interface IUserStatus {
    readonly id?: string;
    name: string;
    label: string;
}

export interface IAccountType {
    readonly id?: string;
    name: string;
    label: string;
}

export interface IUser {
    readonly id?: string;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    uf: string;
    pixKey: string;
    password: string;
    affiliateId: string | null;
    accountTypeId: string;
    accountType?: IAccountType | null;
    userTypeId: string;
    userType?: IUserType | null;
    balance: number;
    statusId: string;
    status?: IUserStatus | null;
    accessToken?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export interface IRegisterUser {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    uf: string;
    pixKey: string;
    password: string;
    affiliateCode?: string;
}

export interface ICreateUser {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    uf: string;
    pixKey: string;
    password: string;
    affiliateCode: string | null;
    accountType: string;
    userType: string;
    status: string;
}

export interface IUserService {

    registerUser(dto: IRegisterUser): Promise<IUser>;

}
