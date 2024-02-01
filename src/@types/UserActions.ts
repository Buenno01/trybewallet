import { AnyAction } from 'redux';

export interface LoginAction extends AnyAction {
  type: 'LOGIN';
  payload: string;
}

export type UserActions = LoginAction;
