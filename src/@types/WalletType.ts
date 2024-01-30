export type CurrenciesType = string[];

export type ExpenseType = {
  id: number,
  value: number,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: number[],
};

export type WalletType = {
  currencies: CurrenciesType,
  expenses: ExpenseType[],
  editor: boolean,
  idToEdit: number,
};
