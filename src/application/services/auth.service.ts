import {RefreshTokenRepository, UserRepository} from "@domain/repositories";
import {IAuthLogin, IAuthService, IRefreshToken} from "@interfaces/auth";
import {IUser} from "@interfaces/user";
import fs from "node:fs";
import jwt from "jsonwebtoken";
import {RefreshToken} from "@domain/entities";
import {InvalidAuthException} from "@domain/exceptions";

export class AuthService implements IAuthService {

    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly userRepository: UserRepository,
    )
    {}

    async login(dto: IAuthLogin): Promise<IUser> {
        const user = await this.userRepository.findOneByCpf(dto.cpf);

        if (!user) {
            throw new InvalidAuthException();
        }

        const isValidPassword = user.comparePassword(dto.password);

        if (!isValidPassword) {
            throw new InvalidAuthException();
        }

        const token = this.generateToken(user);
        const refreshToken = await this.refreshTokenRepository.findOneByUserId(user.id)

        if (refreshToken) {
            refreshToken.revoked = true;
            await this.refreshTokenRepository.update(refreshToken.id!, refreshToken)
        }

        await this.refreshTokenRepository.create(
            new RefreshToken({
                token,
                userId: user.id,
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                revoked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        user.accessToken = token;

        return user;
    }

    async refreshToken(dto: IRefreshToken): Promise<{ token: string }> {
        const refreshToken = await this.refreshTokenRepository.findOneByToken(dto.token);

        if (!refreshToken) {
            throw new Error('Not found refresh token')
        }

        const user = await this.userRepository.findOneById(refreshToken.userId);

        if (!user) {
            throw new Error('Not found user')
        }

        const token = this.generateToken(user)

        refreshToken.revoked = true;
        await this.refreshTokenRepository.update(refreshToken.id!, refreshToken);

        await this.refreshTokenRepository.create(
            new RefreshToken({
                token,
                userId: user.id,
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                revoked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        return {
            token: token
        }
    }

    private generateToken(user: IUser): string {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                accountType: user.accountType?.name,
                userType: user.userType?.name
            },
            fs.readFileSync('certs/private.key'),
            {
                algorithm: 'RS256',
                expiresIn: '5d'
            }
        );
    }
}