import { ApiProperty } from '@nestjs/swagger';

export class Coin {
  @ApiProperty()
  usd: number;
}

export class CoinPrices {
  [key: string]: Coin;
}
