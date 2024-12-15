import {RefreshTokenRepository, UserRepository} from "@domain/repositories";
import {IAuthLogin, IAuthService, IRefreshTokenDto, IRefreshTokenResponse} from "@interfaces/auth";
import {IUser} from "@interfaces/user";
import {RefreshToken} from "@domain/entities";
import {InvalidAuthException, InvalidRefreshTokenException} from "@domain/exceptions";
import {generateJwtToken} from "@shared/utils/generate-jwt-token.util";

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

        const accessToken = generateJwtToken(user, '15m');
        const refreshToken = generateJwtToken(user, '7d');

        const userRefreshToken = await this.refreshTokenRepository.findOneByUserId(user.id)

        if (userRefreshToken) {
            userRefreshToken.revoked = true;
            await this.refreshTokenRepository.update(userRefreshToken.id!, userRefreshToken)
        }

        await this.refreshTokenRepository.create(
            new RefreshToken({
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                revoked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        return user;
    }

    async refreshToken(dto: IRefreshTokenDto): Promise<IRefreshTokenResponse> {
        const userRefreshToken = await this.refreshTokenRepository.findOneByToken(dto.token);

        if (!userRefreshToken) {
            throw new InvalidRefreshTokenException()
        }

        const user = await this.userRepository.findOneById(userRefreshToken.userId);

        if (!user) {
            throw new InvalidRefreshTokenException()
        }

        const accessToken = generateJwtToken(user, '15m')
        const refreshToken = generateJwtToken(user, '7d')

        userRefreshToken.revoked = true;

        await this.refreshTokenRepository.update(userRefreshToken.id!, userRefreshToken);

        await this.refreshTokenRepository.create(
            new RefreshToken({
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                revoked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        return {
            accessToken,
            refreshToken
        }
    }
}