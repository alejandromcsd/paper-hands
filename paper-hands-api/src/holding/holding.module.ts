import { Module } from '@nestjs/common';
import { HoldingService } from './holding.service';
import { HoldingController } from './holding.controller';
import { Holding } from './entities/holding.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Trade } from '../trade/entities/trade.entity';
import { CoinModule } from '../coin/coin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, Holding, Portfolio]), CoinModule],
  controllers: [HoldingController],
  providers: [HoldingService],
  exports: [HoldingService],
})
export class HoldingModule {}
