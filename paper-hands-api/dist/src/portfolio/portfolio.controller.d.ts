import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio>;
    findOne(id: string): Promise<Portfolio>;
    findAll(): Promise<Portfolio[]>;
}
