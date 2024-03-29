import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { LoginFormType } from '../../@types/LoginFormType';
import { WalletFormType } from '../../@types/WalletFormType';
import { ExpenseType } from '../../@types/WalletType';
import { ExchangeRates } from '../../@types/ExchangeRateType';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const START_EDIT_EXPENSE = 'START_EDIT_EXPENSE';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

const createAction = <T>(type:string, payload:T) => ({
  type,
  payload,
});

export const editExpenseAction = (
  id: number,
  expense: WalletFormType,
  expenses: ExpenseType[],
) => {
  const editedExpenses = expenses.map((expenseItem) => (
    expenseItem.id === id ? { ...expenseItem, ...expense } : expenseItem
  ));
  return createAction<ExpenseType[]>(EDIT_EXPENSE, editedExpenses);
};

export const startEditExpenseAction = (expenseId: number) => {
  return createAction<number>(START_EDIT_EXPENSE, expenseId);
};

export const removeExpenseAction = (id: number, expenses: ExpenseType[]) => {
  const filteredExpenses = expenses.filter((expense) => expense.id !== id);
  return createAction<ExpenseType[]>(REMOVE_EXPENSE, filteredExpenses);
};

export const loadCurrenciesAction = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();
      const payload = Object.keys(currencies).filter((currency) => currency !== 'USDT');
      dispatch(createAction<string[]>(LOAD_CURRENCIES, ['BRL', ...payload]));
    } catch (error) {
      dispatch(createAction<string[]>(LOAD_CURRENCIES, ['BRL'] as string[]));
    }
  };
};

export const addExpenseAction = (expense: WalletFormType, expenses: ExpenseType[]) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const BRL: ExchangeRates = {
      BRL: {
        code: 'BRL',
        codein: 'BRL',
        name: 'Real Brasileiro',
        high: '1',
        low: '1',
        varBid: '1',
        pctChange: '1',
        bid: '1',
        ask: '1',
        timestamp: '1',
        create_date: '1',
      },
    };
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies: ExchangeRates = await response.json();
      const lastExpense = expenses[expenses.length - 1];

      const newExpense: ExpenseType = {
        ...expense,
        value: expense.value,
        id: lastExpense ? (lastExpense.id + 1) : 0,
        exchangeRates: { ...currencies, ...BRL },
      };

      dispatch(createAction<ExpenseType>(ADD_EXPENSE, newExpense));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginAction = ({ email }: LoginFormType) => createAction(LOGIN, email);
