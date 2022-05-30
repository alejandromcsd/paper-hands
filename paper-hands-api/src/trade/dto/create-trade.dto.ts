import { ApiProperty } from '@nestjs/swagger';

export class CreateTradeDto {
  @ApiProperty()
  profitTarget: number;

  @ApiProperty()
  pctSold: number;

  @ApiProperty()
  isSold: boolean;
}
