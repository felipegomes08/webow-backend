import {RefreshTokenRepository, UserRepository} from "@domain/repositories";
import {IAuthLogin} from "@interfaces/auth";
import {IUser} from "@interfaces/user";
import fs from "node:fs";
import jwt from "jsonwebtoken";
import {RefreshToken} from "@domain/entities";
import {InvalidAuthException} from "@domain/exceptions";

export class AuthService {

    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly userRepository: UserRepository,
    )
    {}

    async login(dto: IAuthLogin): Promise<IUser> {
        const user = await this.userRepository.findOneByEmail(dto.email);

        if (!user) {
            throw new InvalidAuthException();
        }

        const isValidPassword = user.comparePassword(dto.password);

        if (!isValidPassword) {
            throw new InvalidAuthException();
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                accountType: user.accountType,
                userType: user.userType
            },
            fs.readFileSync('certs/private.key'),
            {
                algorithm: 'RS256',
                expiresIn: '5d'
            }
        );

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
}