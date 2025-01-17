import {ITicketMessage} from "@interfaces/ticket";

export abstract class TicketMessageRepository {

    abstract create(data: ITicketMessage): Promise<ITicketMessage>

    abstract getAllByTicketId(ticketId: string): Promise<ITicketMessage[]>

}