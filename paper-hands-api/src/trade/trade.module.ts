import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { Holding } from '../holding/entities/holding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, Holding])],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
