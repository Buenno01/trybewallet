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

export interface RemoveExpenseAction extends AnyAction {
  type: 'REMOVE_EXPENSE';
  payload: ExpenseType[];
}

type WalletActions = AddExpenseAction | LoadCurrenciesAction | RemoveExpenseAction;

export default WalletActions;
