import {RefreshToken} from "@domain/entities";

export abstract class RefreshTokenRepository {

    abstract create(refreshToken: RefreshToken): Promise<RefreshToken>;

    abstract update(id: string, refreshToken: RefreshToken): Promise<RefreshToken>;

    abstract findOneByUserId(userId: string): Promise<RefreshToken | null>;

    abstract findOneByToken(token: string): Promise<RefreshToken | null>;

}