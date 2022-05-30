import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';
export declare class TradeController {
    private readonly tradeService;
    constructor(tradeService: TradeService);
    create(holdingId: string, createTradeDto: CreateTradeDto): Promise<Trade>;
    findAll(): Promise<Trade[]>;
    findOne(id: string): Promise<Trade>;
    update(id: string, updateTradeDto: UpdateTradeDto): Promise<Trade & UpdateTradeDto>;
    markAsSold(id: string): Promise<Trade>;
    remove(id: string): Promise<Trade>;
}
