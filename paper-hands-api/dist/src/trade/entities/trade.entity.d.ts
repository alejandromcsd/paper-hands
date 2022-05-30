import { Holding } from '../../holding/entities/holding.entity';
export declare class Trade {
    id: number;
    profitTarget: number;
    pctSold: number;
    isSold: boolean;
    holding: Holding;
}
