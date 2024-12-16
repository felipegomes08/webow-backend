import {ITransactionStatus, ITransactionType} from "@interfaces/transaction";
import {IAccountType, IUserStatus, IUserType} from "@interfaces/user";
import {IMatchResult} from "@interfaces/match";
import {IRouletteValue} from "@interfaces/roulette-value";

export interface IMetadata {
    transactionTypes: ITransactionType[]
    accountTypes: IAccountType[]
    matchResults: IMatchResult[]
    transactionStatus: ITransactionStatus[]
    userTypes: IUserType[]
    userStatus: IUserStatus[]
    rouletteValues: IRouletteValue[]
}

export interface IMetadataService {

    getMetadata(): Promise<IMetadata>;

}