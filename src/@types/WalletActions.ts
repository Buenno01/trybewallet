import { AnyAction } from 'redux';
import { ExpenseType } from './WalletType';

export interface AddExpenseAction extends AnyAction {
  type: 'ADD_EXPENSE';
  payload: ExpenseType;
}

export interface LoadCurrenciesAction extends AnyAction {
  type: 'LOAD_CURRENCIES';
  payload: string[];
}

type WalletActions = AddExpenseAction | LoadCurrenciesAction;

export default WalletActions;
