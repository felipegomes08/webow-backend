export interface IRefreshToken {
    id?: string;
    token: string;
    userId: string;
    user?: IUser;
    expiresAt: Date;
    revoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
