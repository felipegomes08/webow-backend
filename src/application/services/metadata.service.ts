import {IMetadata, IMetadataService} from "@interfaces/metadata";
import {
    AccountTypeRepository,
    MatchResultRepository,
    RouletteValueRepository,
    TransactionStatusRepository,
    TransactionTypeRepository,
    UserStatusRepository,
    UserTypeRepository
} from "@domain/repositories";

export class MetadataService implements IMetadataService {

    constructor(
        private readonly userTypeRepository: UserTypeRepository,
        private readonly userStatusRepository: UserStatusRepository,
        private readonly accountTypeRepository: AccountTypeRepository,
        private readonly transactionTypeRepository: TransactionTypeRepository,
        private readonly transactionStatusRepository: TransactionStatusRepository,
        private readonly matchResultRepository: MatchResultRepository,
        private readonly rouletteValueRepository: RouletteValueRepository
    )
    {}

    async getMetadata(): Promise<IMetadata> {
        const [
            userTypes,
            userStatus,
            accountTypes,
            transactionTypes,
            transactionStatus,
            matchResults,
            rouletteValues,
        ] = await Promise.all([
            this.userTypeRepository.findAll(),
            this.userStatusRepository.findAll(),
            this.accountTypeRepository.findAll(),
            this.transactionTypeRepository.findAll(),
            this.transactionStatusRepository.findAll(),
            this.matchResultRepository.findAll(),
            this.rouletteValueRepository.findAll()
        ])

        return {
            userTypes,
            userStatus,
            accountTypes,
            transactionTypes,
            transactionStatus,
            matchResults,
            rouletteValues,
        }
    }

}