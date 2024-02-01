import { ExchangeRates } from './ExchangeRateType';

export type CurrenciesType = string[];

export type ExpenseType = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: ExchangeRates,
};

export type WalletType = {
  currencies: CurrenciesType,
  expenses: ExpenseType[],
  editor: boolean,
  idToEdit: number,
};
