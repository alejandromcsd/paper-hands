export interface IPortfolio {
  id: number;
  name: string;
  holdings: IHolding[];
}

export interface IHolding {
  id: number;
  ticket: string;
  amount: number;
  currentPrice: number;
  avgBuy: number;
  maxMultipleExpected: number;
  maxHodlPctExpected: number;
  initialMultipler: number;
  subsequentMultipler: number;
  minTransaction: number;
  portfolio: IPortfolio;
  trades: ITrade[];
  pendingSell: boolean;
}

export interface ITrade {
  id: number;
  profitTarget: number;
  pctSold: number;
  isSold: boolean;
  holding: IHolding;
}

export interface ICoin {
  ticket: string;
  usd: number;
}

export interface ICoinPrices {
  [key: string]: ICoin;
}
