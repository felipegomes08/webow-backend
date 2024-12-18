import {IGetAllMatchParams, IGetAllMatchResponse, IMatch, IMatchService} from "@interfaces/match";
import {Match} from "@domain/entities";
import {MatchRepository, MatchResultRepository, UserRepository} from "@domain/repositories";

export class MatchService implements IMatchService {

    constructor(
        private readonly matchRepository: MatchRepository,
        private readonly matchResultRepository: MatchResultRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async create(dto: IMatch): Promise<IMatch> {
        const [matchResult, user] = await Promise.all([
            this.matchResultRepository.findOneById(dto.matchResultId),
            this.userRepository.findOneById(dto.userId)
        ])

        if (!matchResult || !user) {
            throw new Error(`User with id ${dto.userId} not found`);
        }

        const match = new Match({
            userId: dto.userId,
            matchResultId: dto.matchResultId,
            amount: dto.amount,
            createdAt: new Date()
        })

        return await this.matchRepository.create(match)
    }

    async findOneById(id: string): Promise<IMatch | null> {
        return await this.matchRepository.findOneById(id)
    }

    async findAll(params: IGetAllMatchParams): Promise<IGetAllMatchResponse> {
        const matches = await this.matchRepository.findAll(params)
        const matchesCount = await this.matchRepository.count(params)

        return {
            matches,
            page: params.page ?? null,
            total: matchesCount
        }
    }

}