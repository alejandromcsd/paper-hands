import { Injectable } from '@nestjs/common';
import { HoldingService } from './holding/holding.service';
import { PortfolioService } from './portfolio/portfolio.service';

@Injectable()
export class AppService {
  constructor(
    private portfolioService: PortfolioService,
    private holdingService: HoldingService,
  ) {}

  async seed() {
    //Create portfolio
    const portfolio = await this.portfolioService.create({
      name: 'Wen moon',
    });

    // Holdings
    await this.holdingService.create(portfolio.id, {
      ticket: 'ethereum',
      amount: 75.8,
      avgBuy: 2500,
      initialMultipler: 3,
      subsequentMultipler: 0.1,
      maxHodlPctExpected: 0.3,
      minTransaction: 1000,
      maxMultipleExpected: 3, // not in use
    });

    await this.holdingService.create(portfolio.id, {
      ticket: 'polkadex',
      amount: 105,
      avgBuy: 23,
      initialMultipler: 10,
      subsequentMultipler: 0.5,
      minTransaction: 500,
      maxHodlPctExpected: 0.5,
      maxMultipleExpected: 5, // not in use
    });

    const finalPortfolio = await this.portfolioService.findOne(portfolio.id);
    return finalPortfolio;
  }
}
