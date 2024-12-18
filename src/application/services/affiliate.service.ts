import {
    AccountTypeRepository, AffiliateRepository,
    RefreshTokenRepository,
    UserRepository,
    UserStatusRepository,
    UserTypeRepository
} from "@domain/repositories";
import {IAffiliate, IAffiliateService, ICreateAffiliate, IGetAllAffiliateParams} from "@interfaces/affiliate";
import {Affiliate, RefreshToken, User} from "@domain/entities";
import {
    CpfAlreadyExistsException,
    InvalidAccountTypeException,
    InvalidUserStatusException,
    InvalidUserTypeException, NotFoundUserException
} from "@domain/exceptions";
import {toResultAsync} from "@shared/utils";
import {generateJwtToken} from "@shared/utils/generate-jwt-token.util";
import {IGetAllUsersParams} from "@interfaces/user";

export class AffiliateService implements IAffiliateService{

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userTypeRepository: UserTypeRepository,
        private readonly userStatusRepository: UserStatusRepository,
        private readonly accountTypeRepository: AccountTypeRepository,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly affiliateRepository: AffiliateRepository
    )
    {}

    async createAffiliate(dto: ICreateAffiliate) {
        const user = new User({
            name: dto.name ?? "",
            cpf: dto.cpf,
            phone: dto.phone,
            email: dto.email ?? "",
            uf: "",
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
            toResultAsync(this.validateUserType('affiliate', user)),
            toResultAsync(this.validateUserStatus('active', user))
        ]);

        const err = errEmail || errAccountType || errUserType || errUserStatus;

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

        const affiliateCreated = await this.affiliateRepository.create(
            new Affiliate({
                userId: userCreated.id!,
                code: dto.code,
                link: dto.link ?? "",
                balance: 0,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        affiliateCreated.user!.accessToken = accessToken
        affiliateCreated.user!.refreshToken = refreshToken;

        return affiliateCreated;
    }

    async getAllAffiliates(params: IGetAllAffiliateParams) {
        const affiliates = await this.affiliateRepository.findAll(params);
        const total = await this.affiliateRepository.countAll(params);

        return {
            affiliates,
            page: params.page ?? null,
            total
        }
    }

    async getAffiliatePlayers(affiliateId: string, params: IGetAllUsersParams) {
        const users = await this.affiliateRepository.findAffiliatePlayers(affiliateId, params);
        const total = await this.affiliateRepository.countAllAffiliatePlayers(affiliateId, params);

        return {
            users,
            page: params.page ?? null,
            total
        }
    }

    async updateAffiliate(id: string, dto: IAffiliate) {
        const affiliate = await this.affiliateRepository.findOneById(id)

        if (!affiliate) {
            throw new NotFoundUserException()
        }

        Object.assign(affiliate, dto)

        return await this.affiliateRepository.update(id, affiliate)
    }

    async deleteAffiliate(id: string) {
        const affiliate = await this.affiliateRepository.findOneById(id)

        if (!affiliate) {
            throw new NotFoundUserException()
        }

        affiliate.active = false;

        await this.affiliateRepository.update(id, affiliate);

        return;
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