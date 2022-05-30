import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoinService } from './coin.service';
import { CoinPrices } from './entities/coin.entity';

@ApiTags('Coins')
@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @ApiOperation({ summary: 'Get coin prices via coingecko' })
  @ApiOkResponse({ type: CoinPrices })
  @Get('prices')
  findPricesByIds(@Query('tickets') tickets: string) {
    return this.coinService.findPricesByIds(tickets);
  }
}
