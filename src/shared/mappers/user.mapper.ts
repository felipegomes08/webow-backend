import {User} from "@domain/entities";
import { Decimal } from '@prisma/client/runtime/library';
import {
    User as PrismaUser,
    UserType as PrismaUserType,
    AccountType as PrismaAccountType,
    UserStatus as PrismaUserStatus,
    Affiliate as PrismaAffiliate
} from '@prisma/client'
import {IUser} from "@interfaces/user";
import {AccountTypeMapper} from "@shared/mappers/account-type.mapper";
import {UserTypeMapper} from "@shared/mappers/user-type.mapper";
import {UserStatusMapper} from "@shared/mappers/user-status.mapper";
import {AffiliateMapper} from "@shared/mappers/affiliate.mapper";

export interface PrismaUserWithJoin extends PrismaUser {
    userType?: PrismaUserType | null,
    accountType?: PrismaAccountType | null,
    status?: PrismaUserStatus | null,
    affiliate: PrismaAffiliate | null,
}

export class UserMapper {

    static toDomain(data: PrismaUserWithJoin): User {
        return new User({
            id: data.id,
            name: data.name,
            cpf: data.cpf,
            phone: data.phone,
            email: data.email,
            uf: data.uf,
            pixKey: data.pixKey,
            password: data.password,
            affiliateId: data.affiliateId,
            affiliate: data.affiliate ? {
                ...data.affiliate,
                balance: data.affiliate.balance.toNumber()
            } : undefined,
            accountTypeId: data.accountTypeId,
            accountType: data.accountType,
            userTypeId: data.userTypeId,
            userType: data.userType,
            balance: data.balance.toNumber(),
            statusId: data.statusId,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        })
    }

    static toPrisma(data: User): Omit<PrismaUser, 'id' | 'createdAt' | 'updatedAt'> {
        return {
            name: data.name ?? "",
            cpf: data.cpf,
            phone: data.phone,
            email: data.email ?? "",
            uf: data.uf ?? "",
            pixKey: data.pixKey ?? "",
            password: data.password,
            affiliateId: data.affiliateId,
            accountTypeId: data.accountTypeId,
            userTypeId: data.userTypeId,
            balance: new Decimal(data.balance),
            statusId: data.statusId
        }
    }

    static toController(data: IUser): Omit<IUser, 'password'> {
        return {
            id: data.id,
            name: data.name,
            cpf: data.cpf,
            phone: data.phone,
            email: data.email,
            uf: data.uf,
            pixKey: data.pixKey,
            affiliateId: data.affiliateId,
            affiliate: data.affiliate ? AffiliateMapper.toController(data.affiliate) : undefined,
            accountTypeId: data.accountTypeId,
            accountType: data.accountType ? AccountTypeMapper.toController(data.accountType) : null,
            userTypeId: data.userTypeId,
            userType: data.userType ? UserTypeMapper.toController(data.userType) : null,
            balance: data.balance,
            statusId: data.statusId,
            status: data.status ? UserStatusMapper.toController(data.status) : null,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        }
    }

}