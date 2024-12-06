import {IUser} from "@interfaces/user";

export interface IAuthLogin {
    cpf: string;
    password: string;
}

export interface IRefreshToken {
    token: string;
}

export interface IAuthService {
    login(dto: IAuthLogin): Promise<IUser>;
    refreshToken(dto: IRefreshToken): Promise<{ token: string }>;
}