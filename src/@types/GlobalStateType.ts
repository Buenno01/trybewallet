import { UserType } from './UserType';
import { WalletType } from './WalletType';

export type GlobalStateType = {
  user: UserType,
  wallet: WalletType,
};
