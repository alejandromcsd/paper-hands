import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { geckoPriceUrl } from '../constants';
import { lastValueFrom } from 'rxjs';
import { CoinPrices } from './entities/coin.entity';

@Injectable()
export class CoinService {
  constructor(private httpService: HttpService) {}
  async findPricesByIds(tickets: string) {
    const prices = await lastValueFrom(
      this.httpService.get(`${geckoPriceUrl}?ids=${tickets}&vs_currencies=usd`),
    );

    const ticketsArray = tickets.split(',');
    const coins = new CoinPrices();
    ticketsArray.forEach((t) => {
      if (prices.data[t]) {
        coins[t] = {
          usd: prices.data[t].usd,
        };
      }
    });
    return coins;
  }
}
