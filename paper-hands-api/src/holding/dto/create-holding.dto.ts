import { ApiProperty } from '@nestjs/swagger';

export class CreateHoldingDto {
  @ApiProperty()
  ticket: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  avgBuy: number;

  @ApiProperty()
  maxMultipleExpected: number;

  @ApiProperty()
  maxHodlPctExpected: number;

  @ApiProperty()
  initialMultipler: number;

  @ApiProperty()
  subsequentMultipler: number;

  @ApiProperty()
  minTransaction: number;
}
