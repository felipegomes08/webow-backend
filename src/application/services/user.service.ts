import {
    ICreateUser,
    IGetAllUsersParams,
    IGetAllUsersResponse,
    IRegisterUser,
    IUpdateUser,
    IUser,
    IUserService
} from "@interfaces/user";
import {
    AccountTypeRepository, AffiliateRepository, ConfigurationRepository, RefreshTokenRepository,
    UserRepository,
    UserStatusRepository,
    UserTypeRepository
} from "@domain/repositories";
import {RefreshToken, User} from "@domain/entities";
import {toResultAsync} from "@shared/utils";
import {
    CpfAlreadyExistsException,
    InvalidAccountTypeException,
    InvalidUserStatusException,
    InvalidUserTypeException
} from "@domain/exceptions";
import {generateJwtToken} from "@shared/utils/generate-jwt-token.util";

export class UserService implements  IUserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userTypeRepository: UserTypeRepository,
        private readonly userStatusRepository: UserStatusRepository,
        private readonly accountTypeRepository: AccountTypeRepository,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly affiliateRepository: AffiliateRepository,
        private readonly configurationRepository: ConfigurationRepository
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
            [errAffiliate]
        ] = await Promise.all([
            toResultAsync(this.validateCpf(dto.cpf, user)),
            toResultAsync(this.validateAccountType('beginner', user)),
            toResultAsync(this.validateUserType('player', user)),
            toResultAsync(this.validateUserStatus('active', user)),
            toResultAsync(this.validateAffiliateCode(dto.affiliateCode!, user))
        ]);

        const err = errEmail || errAccountType || errUserType || errUserStatus || errAffiliate;

        if (err) throw err;

        const refreshToken = generateJwtToken(user, '7d');
        const accessToken = generateJwtToken(user, '5d');

        user.hashPassword()

        const userCreated = await this.userRepository.create(user)

        await this.refreshTokenRepository.create(
            new RefreshToken({
                token: refreshToken,
                userId: userCreated.id,
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                revoked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        userCreated.accessToken = accessToken
        userCreated.refreshToken = refreshToken;

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
            [errAffiliate]
        ] = await Promise.all([
            toResultAsync(this.validateCpf(dto.cpf, user)),
            toResultAsync(this.validateAccountType(dto.accountType, user)),
            toResultAsync(this.validateUserType(dto.userType, user)),
            toResultAsync(this.validateUserStatus(dto.status, user)),
            toResultAsync(this.validateAffiliateCode(dto.affiliateCode!, user))
        ]);

        const err = errEmail || errAccountType || errUserType || errUserStatus || errAffiliate;

        if (err) throw err;

        const refreshToken = generateJwtToken(user, '7d');
        const accessToken = generateJwtToken(user, '15m');

        user.hashPassword()

        const userCreated = await this.userRepository.create(user)

        await this.refreshTokenRepository.create(
            new RefreshToken({
                token: refreshToken,
                userId: userCreated.id,
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                revoked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        userCreated.accessToken = accessToken
        userCreated.refreshToken = refreshToken;

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

        if (['player', 'affiliate'].includes(user.userType!.name)) {
            if (data.userType) {
                throw new InvalidUserTypeException()
            }

            if (data.status) {
                throw new InvalidUserStatusException()
            }

            if (data.accountType) {
                throw new InvalidAccountTypeException()
            }
        }

        Object.assign(user, data)

        const [
            [errEmail],
            [errAccountType],
            [errUserType],
            [errUserStatus],
            [errAffiliate]
        ] = await Promise.all([
            toResultAsync(this.validateCpf(data.cpf!, user)),
            toResultAsync(this.validateAccountType(data.accountType!, user, false)),
            toResultAsync(this.validateUserType(data.userType!, user, false)),
            toResultAsync(this.validateUserStatus(data.status!, user, false)),
            toResultAsync(this.validateAffiliateCode(data.affiliateCode!, user))
        ]);

        const err = errEmail || errAccountType || errUserType || errUserStatus || errAffiliate;

        if (err) throw err;

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

    async getAllUsers(params: IGetAllUsersParams): Promise<IGetAllUsersResponse> {
        const users = await this.userRepository.findAll(params);
        const countAllUsers = await this.userRepository.count(params);

        return {
            users,
            page: params.page ?? null,
            total: countAllUsers
        }
    }

    async validateUserType(userType: string, user: User, required: boolean = true): Promise<User> {
        if (!userType) {
            if (required) {
                throw new InvalidUserTypeException()
            }

            return user;
        }

        const userTypeRegister = await this.userTypeRepository.findOneByName(userType);

        if (!userTypeRegister) {
            throw new InvalidUserTypeException()
        }

        user.userTypeId = userTypeRegister.id!;
        user.userType = userTypeRegister

        return user
    }

    async validateAccountType(accountType: string, user: User, required: boolean = true): Promise<User> {
        if (!accountType) {
            if (required) {
                throw new InvalidAccountTypeException()
            }

            return user
        }

        const accountTypeRegister = await this.accountTypeRepository.findOneByName(accountType);

        if (!accountTypeRegister) {
            throw new InvalidAccountTypeException()
        }

        user.accountTypeId = accountTypeRegister.id!;
        user.accountType = accountTypeRegister

        return user
    }

    async validateUserStatus(status: string, user: User, required: boolean = true): Promise<User> {
        if (!status) {
            if (required) {
                throw new InvalidUserStatusException()
            }

            return user
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
        if (!cpf) {
            return user;
        }

        const userAlreadyExists = await this.userRepository.findOneByCpf(cpf);

        if (userAlreadyExists) {
            throw new CpfAlreadyExistsException()
        }

        return user
    }

    async validateAffiliateCode(affiliateCode: string, user: User): Promise<User> {
        if(!affiliateCode) {
            return user
        }

        const affiliate = await this.affiliateRepository.findOneByCode(affiliateCode)

        if (!affiliate) {
            throw new Error('Not found affiliate')
        }

        user.affiliateId = affiliate.id!;
        user.affiliate = affiliate;

        return user
        // const configuration = await this.configurationRepository.findUnique()
        //
        // if (!configuration) {
        //     throw new Error('Not found configuration')
        // }
        //
        // const affiliateCpaPercentage: number = (configuration.system as any)['CPA']['value'];
    }

}