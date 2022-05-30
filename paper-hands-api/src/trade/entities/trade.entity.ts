import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Holding } from '../../holding/entities/holding.entity';

@Entity()
export class Trade {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'numeric', precision: 2, scale: 2 })
  profitTarget: number;

  @ApiProperty()
  @Column({ type: 'numeric', precision: 2, scale: 2 })
  pctSold: number;

  @ApiProperty()
  @Column()
  isSold: boolean;

  @ManyToOne((type) => Holding, (holding) => holding.trades)
  holding: Holding;
}
