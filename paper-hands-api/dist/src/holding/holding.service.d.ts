import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import { Holding } from './entities/holding.entity';
import { Trade } from '../trade/entities/trade.entity';
export declare class HoldingService {
    private tradeRepository;
    private holdingRepository;
    private portfolioRepository;
    constructor(tradeRepository: Repository<Trade>, holdingRepository: Repository<Holding>, portfolioRepository: Repository<Portfolio>);
    generateTrades(createHoldingDto: CreateHoldingDto): Trade[];
    saveTrades(holding: Holding, trades: Trade[]): Promise<void>;
    create(portfolioId: number, createHoldingDto: CreateHoldingDto): Promise<Holding>;
    findAll(): Promise<Holding[]>;
    findOne(id: number): Promise<Holding>;
    update(id: number, updateHoldingDto: UpdateHoldingDto): Promise<Holding & UpdateHoldingDto>;
    remove(id: number): Promise<Holding>;
}
