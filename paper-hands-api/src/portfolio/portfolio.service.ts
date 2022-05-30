import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  create(createPortfolioDto: CreatePortfolioDto) {
    const portfolio = this.portfolioRepository.create(createPortfolioDto);
    return this.portfolioRepository.save(portfolio);
  }
  findOne(id: number) {
    return this.portfolioRepository.findOne(id, {
      relations: ['holdings', 'holdings.trades'],
    });
  }
  findAll() {
    return this.portfolioRepository.find({
      relations: ['holdings', 'holdings.trades'],
    });
  }
}
