import {IUser} from "@interfaces/user";

export interface IAuthLogin {
    email: string;
    password: string;
}

export interface IAuthService {
    login(dto: IAuthLogin): Promise<IUser>;
}