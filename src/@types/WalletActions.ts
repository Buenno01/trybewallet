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

export interface EditExpenseAction extends AnyAction {
  type: 'EDIT_EXPENSE';
  payload: ExpenseType[];
}

export interface StartEditExpenseAction extends AnyAction {
  type: 'START_EDIT_EXPENSE';
  payload: number;
}

type WalletActions = AddExpenseAction | LoadCurrenciesAction
| RemoveExpenseAction | EditExpenseAction | StartEditExpenseAction;

export default WalletActions;
