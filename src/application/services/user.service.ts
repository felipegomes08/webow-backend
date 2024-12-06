import {ICreateUser, IGetAllUsersResponse, IRegisterUser, IUpdateUser, IUser, IUserService} from "@interfaces/user";
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
    CpfAlreadyExistsException,
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
            name: dto.name ?? "",
            cpf: dto.cpf,
            phone: dto.phone,
            email: dto.email ?? "",
            uf: dto.uf ?? "",
            pixKey: dto.pixKey ?? "",
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
            toResultAsync(this.validateCpf(dto.cpf, user)),
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

    async createUser(dto: ICreateUser): Promise<IUser> {
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
            toResultAsync(this.validateCpf(dto.cpf, user)),
            toResultAsync(this.validateAccountType(dto.accountType, user)),
            toResultAsync(this.validateUserType(dto.userType, user)),
            toResultAsync(this.validateUserStatus(dto.status, user))
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

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOneById(id);

        if (!user) {
            throw new Error('Not found user')
        }

        const status = await this.userStatusRepository.findOneByName('inactive');

        if (!status) {
            throw new Error('Not found user status')
        }

        user.statusId = status.id!;

        const refreshToken = await this.refreshTokenRepository.findOneByUserId(user.id);

        if (!refreshToken) {
            throw new Error('Not found refresh token')
        }

        refreshToken.revoked = true;

        await this.refreshTokenRepository.update(refreshToken.id!, refreshToken);
    }

    async updateUser(id: string, data: IUpdateUser): Promise<IUser> {
        const user = await this.userRepository.findOneById(id);

        if (!user) {
            throw new Error('Not found user')
        }

        Object.assign(user, data)

        if (data.password) {
            user.hashPassword()
        }

        return await this.userRepository.update(id, user)
    }

    async getUserById(id: string): Promise<IUser | null> {
        const user = await this.userRepository.findOneById(id);

        if (!user) {
            throw new Error('Not found user');
        }

        return user;
    }

    async getAllUsers(page?: number, limit?: number): Promise<IGetAllUsersResponse> {
        const users = await this.userRepository.findAll(page, limit);
        const countAllUsers = await this.userRepository.count();

        return {
            users,
            total: countAllUsers
        }
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

    async validateCpf(cpf: string, user: User): Promise<User> {
        const userAlreadyExists = await this.userRepository.findOneByCpf(cpf);

        if (userAlreadyExists) {
            throw new CpfAlreadyExistsException()
        }

        return user
    }

}