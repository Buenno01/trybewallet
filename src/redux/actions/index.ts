import { LoginFormType } from '../../@types/LoginFormType';

const createAction = (type:string, payload:any) => {
  return {
    type,
    payload,
  };
};

export const loginAction = ({ email }: LoginFormType) => createAction('LOGIN', { email });
