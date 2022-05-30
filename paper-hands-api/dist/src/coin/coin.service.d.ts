import { HttpService } from '@nestjs/axios';
import { CoinPrices } from './entities/coin.entity';
export declare class CoinService {
    private httpService;
    constructor(httpService: HttpService);
    findPricesByIds(tickets: string): Promise<CoinPrices>;
}
