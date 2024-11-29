import {IRegisterUser, IUserService} from "@interfaces/user";
import {
    AccountTypeRepository, RefreshTokenRepository,
    UserRepository,
    UserStatusRepository,
    UserTypeRepository
} from "@domain/repositories";
import {RefreshToken, User} from "@domain/entities";
import {toResultAsync} from "@shared/utils";
import jwt from 'jsonwebtoken'
import fs from 'node:fs'
import {
    EmailAlreadyExistsException,
    InvalidAccountTypeException,
    InvalidUserStatusException,
    InvalidUserTypeException
} from "@domain/exceptions";

export class UserService implements  IUserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userTypeRepository: UserTypeRepository,
        private readonly userStatusRepository: UserStatusRepository,
        private readonly accountTypeRepository: AccountTypeRepository,
        private readonly refreshTokenRepository: RefreshTokenRepository
    )
    {}

    async registerUser(dto: IRegisterUser) {
        const user = new User({
            name: dto.name,
            cpf: dto.cpf,
            phone: dto.phone,
            email: dto.email,
            uf: dto.uf,
            pixKey: dto.pixKey,
            password: dto.password,
            affiliateId: null,
            accountTypeId: "",
            userTypeId: "",
            statusId: "",
            balance: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const [
            [errEmail],
            [errAccountType],
            [errUserType],
            [errUserStatus],
        ] = await Promise.all([
            toResultAsync(this.validateEmail(dto.email, user)),
            toResultAsync(this.validateAccountType('beginner', user)),
            toResultAsync(this.validateUserType('player', user)),
            toResultAsync(this.validateUserStatus('active', user))
        ]);

        const err = errEmail || errAccountType || errUserType || errUserStatus;

        if (err) throw err;

        const privateKey = fs.readFileSync('certs/private.key');

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                accountType: user.accountType,
                userType: user.userType
            },
            privateKey,
            {
                algorithm: 'RS256',
                expiresIn: '5d'
            }
        );

        user.hashPassword()

        const userCreated = await this.userRepository.create(user)

        await this.refreshTokenRepository.create(
            new RefreshToken({
                token,
                userId: userCreated.id,
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                revoked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        userCreated.accessToken = token

        return userCreated;
    }

    async validateUserType(userType: string, user: User): Promise<User> {
        if (!userType) {
            throw new InvalidUserTypeException()
        }

        const userTypeRegister = await this.userTypeRepository.findOneByName(userType);

        if (!userTypeRegister) {
            throw new InvalidUserTypeException()
        }

        user.userTypeId = userTypeRegister.id!;
        user.userType = userTypeRegister

        return user
    }

    async validateAccountType(accountType: string, user: User): Promise<User> {
        if (!accountType) {
            throw new InvalidAccountTypeException()
        }

        const accountTypeRegister = await this.accountTypeRepository.findOneByName(accountType);

        if (!accountTypeRegister) {
            throw new InvalidAccountTypeException()
        }

        user.accountTypeId = accountTypeRegister.id!;
        user.accountType = accountTypeRegister

        return user
    }

    async validateUserStatus(status: string, user: User): Promise<User> {
        if (!status) {
            throw new InvalidUserStatusException()
        }

        const statusRegister = await this.userStatusRepository.findOneByName(status);

        if (!statusRegister) {
            throw new InvalidUserStatusException()
        }

        user.statusId = statusRegister.id!;
        user.status = statusRegister

        return user
    }

    async validateEmail(email: string, user: User): Promise<User> {
        const userAlreadyExists = await this.userRepository.findOneByEmail(email);

        if (userAlreadyExists) {
            throw new EmailAlreadyExistsException()
        }

        return user
    }

}