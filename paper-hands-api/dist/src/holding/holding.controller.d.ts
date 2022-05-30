import { HoldingService } from './holding.service';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import { Holding } from './entities/holding.entity';
export declare class HoldingController {
    private readonly holdingService;
    constructor(holdingService: HoldingService);
    create(portfolioId: string, createHoldingDto: CreateHoldingDto): Promise<Holding>;
    findAll(): Promise<Holding[]>;
    findOne(id: string): Promise<Holding>;
    update(id: string, updateHoldingDto: UpdateHoldingDto): Promise<Holding & UpdateHoldingDto>;
    remove(id: string): Promise<Holding>;
}
