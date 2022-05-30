import { ApiProperty } from '@nestjs/swagger';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trade } from '../../trade/entities/trade.entity';

@Entity()
export class Holding {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  ticket: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column({ type: 'numeric', precision: 12, scale: 12 })
  avgBuy: number;

  @ApiProperty()
  @Column()
  maxMultipleExpected: number;

  @ApiProperty()
  @Column({ type: 'numeric', precision: 12, scale: 12 })
  maxHodlPctExpected: number;

  @ApiProperty()
  @Column({ type: 'numeric', precision: 3, scale: 2 })
  initialMultipler: number;

  @ApiProperty()
  @Column({ type: 'numeric', precision: 3, scale: 2 })
  subsequentMultipler: number;

  @ApiProperty()
  @Column()
  minTransaction: number;

  @ApiProperty({ type: () => Portfolio })
  @ManyToOne((type) => Portfolio, (portfolio) => portfolio.holdings)
  portfolio: Portfolio;

  @OneToMany((type) => Trade, (trade) => trade.holding)
  trades: Trade[];
}
