import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';

@Module({
  imports: [HttpModule],
  controllers: [CoinController],
  providers: [CoinService],
  exports: [CoinService],
})
export class CoinModule {}
