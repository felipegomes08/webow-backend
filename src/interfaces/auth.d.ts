import {IUser} from "@interfaces/user";

export interface IAuthLogin {
    cpf: string;
    password: string;
}

export interface IRefreshTokenResponse {
    accessToken: string
    refreshToken: string
}

export interface IRefreshTokenDto{
    token: string
}

export interface IAuthService {
    login(dto: IAuthLogin): Promise<IUser>;
    refreshToken(dto: IRefreshTokenDto): Promise<IRefreshTokenResponse>;
}