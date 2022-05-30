import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import { Holding } from './entities/holding.entity';
import { Trade } from '../trade/entities/trade.entity';

@Injectable()
export class HoldingService {
  constructor(
    @InjectRepository(Trade)
    private tradeRepository: Repository<Trade>,
    @InjectRepository(Holding)
    private holdingRepository: Repository<Holding>,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  generateTrades(createHoldingDto: CreateHoldingDto) {
    const trades: Trade[] = [];

    // Find 1st multiplier and amount to sell starting at 1.5X and 1% sold
    // Lowest revenue should be 500 due to gas
    let cumulativePctSold = 0.0;

    // To be improved, should be dynamic according to Market Cap
    let multiplier = createHoldingDto.initialMultipler;
    let pctToSell = 0.01;
    const sellPrice = createHoldingDto.avgBuy * multiplier;
    let amountToSell = pctToSell * createHoldingDto.amount;
    let revenue = sellPrice * amountToSell;

    while (revenue < createHoldingDto.minTransaction) {
      pctToSell += 0.01;
      amountToSell = pctToSell * createHoldingDto.amount;
      revenue = sellPrice * amountToSell;
    }

    // Keep creating trades until reaching hodl expected
    do {
      const trade = this.tradeRepository.create({
        profitTarget: multiplier,
        pctSold: pctToSell,
        isSold: false,
      });
      cumulativePctSold += pctToSell;
      pctToSell += 0.01;

      trades.push(trade);

      // To be improved, should be dynamic according to Market Cap
      multiplier += createHoldingDto.subsequentMultipler;
    } while (
      cumulativePctSold + pctToSell <
      1 - createHoldingDto.maxHodlPctExpected
    );

    return trades;
  }

  async saveTrades(holding: Holding, trades: Trade[]) {
    const savedTrades = await Promise.all(
      trades.map(async (t) => {
        await this.tradeRepository.save(t);
        return t;
      }),
    );
    holding.trades = savedTrades;
    await this.holdingRepository.save(holding);
  }

  async create(portfolioId: number, createHoldingDto: CreateHoldingDto) {
    const holding = this.holdingRepository.create(createHoldingDto);
    const trades = this.generateTrades(createHoldingDto);
    await this.saveTrades(holding, trades);

    const portfolio = await this.portfolioRepository.findOne(portfolioId, {
      relations: ['holdings'],
    });
    portfolio.holdings.push(holding);
    await this.portfolioRepository.save(portfolio);

    return holding;
  }

  findAll() {
    return this.holdingRepository.find({ relations: ['portfolio', 'trades'] });
  }

  findOne(id: number) {
    return this.holdingRepository.findOne(id, {
      relations: ['portfolio', 'trades'],
    });
  }

  async update(id: number, updateHoldingDto: UpdateHoldingDto) {
    const toUpdate = await this.findOne(id);
    const updated = Object.assign(toUpdate, updateHoldingDto);
    return this.holdingRepository.save(updated);
  }

  async remove(id: number) {
    const holding = await this.findOne(id);
    return this.holdingRepository.remove(holding);
  }
}
