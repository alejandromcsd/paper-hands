import { Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';
export declare class PortfolioService {
    private portfolioRepository;
    constructor(portfolioRepository: Repository<Portfolio>);
    create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio>;
    findOne(id: number): Promise<Portfolio>;
    findAll(): Promise<Portfolio[]>;
}
