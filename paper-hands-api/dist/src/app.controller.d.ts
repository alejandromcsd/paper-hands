import { AppService } from './app.service';
import { CoinService } from './coin/coin.service';
import { Portfolio } from './portfolio/entities/portfolio.entity';
export declare class AppController {
    private readonly appService;
    private coinService;
    constructor(appService: AppService, coinService: CoinService);
    seed(): Promise<Portfolio>;
}
