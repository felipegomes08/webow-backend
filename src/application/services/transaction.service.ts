import {
    ICreateTransaction,
    IGetAllTransactionsParams, IGetAllTransactionsResponse,
    ITransaction,
    ITransactionService
} from "@interfaces/transaction";
import {
    ConfigurationRepository,
    TransactionRepository,
    TransactionStatusRepository, TransactionTypeRepository,
    UserRepository
} from "@domain/repositories";
import {Transaction} from "@domain/entities";
import {
    InvalidDepositRequestException,
    InvalidWithdrawRequestException,
} from "@domain/exceptions";

export class TransactionService implements ITransactionService {

    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly transactionStatusRepository: TransactionStatusRepository,
        private readonly transactionTypeRepository: TransactionTypeRepository,
        private readonly userRepository: UserRepository,
        private readonly configurationRepository: ConfigurationRepository,
    )
    {}

    async createTransaction(type: string, dto: ICreateTransaction): Promise<ITransaction> {
        const cases = {
            deposit: async () => this.createDepositTransaction(dto),
            withdraw: async () => this.createWithdrawalTransaction(dto)
        }

        return await cases[type as 'deposit']();
    }

    async createWithdrawalTransaction(dto: ICreateTransaction) {
        const [status, type, user] = await Promise.all([
            this.transactionStatusRepository.findByName('processing'),
            this.transactionTypeRepository.findByName('withdraw'),
            this.userRepository.findOneById(dto.userId)
        ])

        if (!status || !type || !user) {
            throw new InvalidWithdrawRequestException()
        }

        const transaction = new Transaction({
            userId: dto.userId,
            amount: dto.amount,
            pixKey: user.pixKey!,
            statusId: status.id!,
            typeId: type.id!,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return await this.transactionRepository.create(transaction)
    }

    async createDepositTransaction(dto: ICreateTransaction) {
        const [status, type, user] = await Promise.all([
            this.transactionStatusRepository.findByName('waitingPayment'),
            this.transactionTypeRepository.findByName('deposit'),
            this.userRepository.findOneById(dto.userId)
        ])

        if (!status || !type || !user) {
            throw new InvalidDepositRequestException()
        }

        // Generate pix key here

        const transaction = new Transaction({
            userId: dto.userId,
            amount: dto.amount,
            pixKey: '',
            statusId: status.id!,
            typeId: type.id!,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return await this.transactionRepository.create(transaction)
    }

    async getTransactionById(id: string): Promise<ITransaction | null> {
        return await this.transactionRepository.findOneById(id)
    }

    async updateTransaction(id: string, dto: Transaction): Promise<ITransaction> {
        const transaction = await this.transactionRepository.findOneById(id)

        if (!transaction) {
            throw new InvalidWithdrawRequestException()
        }

        Object.assign(transaction, dto)

        return await this.transactionRepository.update(id, transaction)
    }

    async getAll(params: IGetAllTransactionsParams): Promise<IGetAllTransactionsResponse> {
        const transactions = await this.transactionRepository.findAll(params);
        const transactionsCount = await this.transactionRepository.count(params);

        return {
            transactions,
            page: params.page ?? null,
            total: transactionsCount
        }
    }
}