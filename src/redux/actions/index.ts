import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { LoginFormType } from '../../@types/LoginFormType';
import { WalletFormType } from '../../@types/WalletFormType';
import { ExpenseType } from '../../@types/WalletType';
import { ExchangeRates } from '../../@types/ExchangeRateType';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

const createAction = <T>(type:string, payload:T) => ({
  type,
  payload,
});

export const loadCurrenciesAction = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();
      const payload = Object.keys(currencies).filter((currency) => currency !== 'USDT');
      dispatch(createAction<string[]>(LOAD_CURRENCIES, payload));
    } catch (error) {
      dispatch(createAction<string[]>(LOAD_CURRENCIES, [] as string[]));
    }
  };
};

export const addExpenseAction = (expense: WalletFormType, expenses: ExpenseType[]) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();
      const lastExpense = expenses[expenses.length - 1];

      const newExpense: ExpenseType = {
        ...expense,
        value: expense.value,
        id: lastExpense ? (lastExpense.id + 1) : 0,
        exchangeRates: currencies as ExchangeRates,
      };

      dispatch(createAction<ExpenseType>(ADD_EXPENSE, newExpense));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginAction = ({ email }: LoginFormType) => createAction(LOGIN, email);
