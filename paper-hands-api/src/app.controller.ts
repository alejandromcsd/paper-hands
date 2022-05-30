import { Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CoinService } from './coin/coin.service';
import { Portfolio } from './portfolio/entities/portfolio.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private coinService: CoinService,
  ) {}

  @ApiOperation({ summary: 'Seed a demo portfolio' })
  @ApiCreatedResponse({ type: Portfolio })
  @Post('seed')
  async seed() {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const portfolio = await this.appService.seed();

    console.log('------- Init App Seed --------');
    portfolio.holdings.forEach(async (holding) => {
      let cumulativePctSold = 0;
      let cumulativeRevenue = 0;

      const coins = await this.coinService.findPricesByIds(holding.ticket);
      console.log(
        `${holding.ticket} - Current value: ${formatter.format(
          holding.amount * coins[holding.ticket].usd,
        )}`,
      );
      holding.trades.forEach((trade, i) => {
        const price = trade.profitTarget * holding.avgBuy;
        const amountSold = trade.pctSold * holding.amount;
        const revenue = Math.round(price * amountSold);
        const pctSold = Math.round(trade.pctSold * 100);
        cumulativePctSold += pctSold;
        cumulativeRevenue += revenue;

        console.log(
          `${holding.ticket} ${i + 1} -` +
            ` (${trade.profitTarget}X) \t ${formatter.format(price)} \t| \t` +
            `AMOUNT: ${amountSold.toFixed(2)} \t | \t` +
            `REVENUE: ${formatter.format(revenue)} | ` +
            `% SOLD: ${pctSold}% | ` +
            `CUMULATIVE SOLD: ${cumulativePctSold}%`,
        );
      });
      console.log(`TOTAL REVENUE: ${formatter.format(cumulativeRevenue)}`);
      console.log('------- End App Seed --------');
    });
    return portfolio;
  }
}
