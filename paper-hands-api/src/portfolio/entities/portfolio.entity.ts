import { ApiProperty } from '@nestjs/swagger';
import { Holding } from '../../holding/entities/holding.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Portfolio {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany((type) => Holding, (holding) => holding.portfolio)
  holdings: Holding[];
}
