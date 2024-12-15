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
    name: string | null;
    cpf: string;
    phone: string;
    email: string | null;
    uf: string | null;
    pixKey: string | null;
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
    refreshToken?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export interface IRegisterUser {
    name?: string;
    cpf: string;
    phone: string;
    email?: string;
    uf?: string;
    pixKey?: string;
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
    affiliateCode?: string;
    accountType: string;
    userType: string;
    status: string;
}

export interface IUpdateUser {
    name?: string;
    cpf?: string;
    phone?: string;
    email?: string;
    uf?: string;
    pixKey?: string;
    password?: string;
    accountType?: string;
    affiliateCode?: string;
    userType?: string;
    status?: string;
}

export interface IGetAllUsersResponse {
    users: IUser[];
    page: number | null;
    total: number;
}

export interface IUserService {

    registerUser(dto: IRegisterUser): Promise<IUser>;

    getAllUsers(page?: number, limit?: number): Promise<IGetAllUsersResponse>;

    getUserById(id: string): Promise<IUser | null>;

    deleteUser(id: string): Promise<void>;

    updateUser(id: string, data: IUpdateUser): Promise<IUser>;

    createUser(data: ICreateUser): Promise<IUser>;

}
