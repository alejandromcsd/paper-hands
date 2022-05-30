import { Repository } from 'typeorm';
import { Holding } from '../holding/entities/holding.entity';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';
export declare class TradeService {
    private holdingRepository;
    private tradeRepository;
    constructor(holdingRepository: Repository<Holding>, tradeRepository: Repository<Trade>);
    create(holdingId: number, createTradeDto: CreateTradeDto): Promise<Trade>;
    findAll(): Promise<Trade[]>;
    findOne(id: number): Promise<Trade>;
    update(id: number, updateTradeDto: UpdateTradeDto): Promise<Trade & UpdateTradeDto>;
    toggleStatus(id: number): Promise<Trade>;
    remove(id: number): Promise<Trade>;
}
