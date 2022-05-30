import { CoinService } from './coin.service';
import { CoinPrices } from './entities/coin.entity';
export declare class CoinController {
    private readonly coinService;
    constructor(coinService: CoinService);
    findPricesByIds(tickets: string): Promise<CoinPrices>;
}
