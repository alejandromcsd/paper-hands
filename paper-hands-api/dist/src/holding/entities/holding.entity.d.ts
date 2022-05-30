import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import { Trade } from '../../trade/entities/trade.entity';
export declare class Holding {
    id: number;
    ticket: string;
    amount: number;
    avgBuy: number;
    maxMultipleExpected: number;
    maxHodlPctExpected: number;
    initialMultipler: number;
    subsequentMultipler: number;
    minTransaction: number;
    portfolio: Portfolio;
    trades: Trade[];
}
