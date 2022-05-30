import create, { GetState, SetState } from 'zustand';
import axios from 'axios';
import { baseApiUrl } from '../constants';
import { IPortfolio } from '../models/model';

const client = axios.create({
  baseURL: baseApiUrl,
});

const getPrices = async (portfolio: IPortfolio) => {
  const tickets = portfolio.holdings.map((h) => h.ticket).concat(',');
  try {
    const { data } = await client.get(
      `${baseApiUrl}/coin/prices?tickets=${tickets}`
    );
    return data;
  } catch (ex) {
    console.log(`Unable to retrieve prices: ${ex}`);
  }
};

interface IPortfolioStore {
  portfolio: IPortfolio;
  pricesFetched: boolean;
  fetchPortfolio: (id: number) => void;
}

export const useStore = create<IPortfolioStore>(
  (set: SetState<IPortfolioStore>, get: GetState<IPortfolioStore>) => ({
    portfolio: {} as IPortfolio,
    pricesFetched: false,
    fetchPortfolio: async (id: number) => {
      const { data } = await client.get(`${baseApiUrl}/portfolio/${id}`);
      const portfolio: IPortfolio = {
        ...data,
      };

      const prices = await getPrices(portfolio);
      if (prices) {
        portfolio.holdings = portfolio.holdings.map((h) => {
          return {
            ...h,
            currentPrice: prices[h.ticket].usd || 0,
          };
        });
      }

      set({
        portfolio: {
          ...portfolio,
        },
      });
    },
  })
);

export default useStore;
