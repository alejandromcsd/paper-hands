import { HoldingService } from './holding/holding.service';
import { Portfolio } from './portfolio/entities/portfolio.entity';
import { PortfolioService } from './portfolio/portfolio.service';
export declare class AppService {
    private portfolioService;
    private holdingService;
    constructor(portfolioService: PortfolioService, holdingService: HoldingService);
    seed(): Promise<Portfolio>;
}
