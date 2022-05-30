import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holding } from '../holding/entities/holding.entity';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Holding)
    private holdingRepository: Repository<Holding>,
    @InjectRepository(Trade)
    private tradeRepository: Repository<Trade>,
  ) {}

  async create(holdingId: number, createTradeDto: CreateTradeDto) {
    const trade = this.tradeRepository.create(createTradeDto);
    const newTrade = await this.tradeRepository.save(trade);

    const holding = await this.holdingRepository.findOne(holdingId, {
      relations: ['trades'],
    });
    holding.trades.push(trade);
    await this.holdingRepository.save(holding);

    return newTrade;
  }

  findAll() {
    return this.tradeRepository.find();
  }

  findOne(id: number) {
    return this.tradeRepository.findOne(id);
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    const toUpdate = await this.findOne(id);
    let updated = Object.assign(toUpdate, updateTradeDto);
    return this.tradeRepository.save(updated);
  }

  async toggleStatus(id: number) {
    const trade = await this.findOne(id);
    trade.isSold = !trade.isSold;
    return this.tradeRepository.save(trade);
  }

  async remove(id: number) {
    const trade = await this.findOne(id);
    return this.tradeRepository.remove(trade);
  }
}
