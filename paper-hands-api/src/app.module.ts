import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { HoldingModule } from './holding/holding.module';
import { TradeModule } from './trade/trade.module';
import config from '../ormconfig';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PortfolioModule,
    HoldingModule,
    TradeModule,
    CoinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
