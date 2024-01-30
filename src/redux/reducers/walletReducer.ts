import { AnyAction } from 'redux';
import { WalletType } from '../../@types/WalletType';

const initialState: WalletType = {
  currencies: ['BRL'],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default walletReducer;
