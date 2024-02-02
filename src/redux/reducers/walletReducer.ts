import { WalletType } from '../../@types/WalletType';
import { ADD_EXPENSE, LOAD_CURRENCIES } from '../actions';
import WalletActions from '../../@types/WalletActions';

const initialState: WalletType = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case ADD_EXPENSE:
      // todo
      return { ...state, expenses: [...state.expenses, action.payload] };
    case LOAD_CURRENCIES:
      return { ...state, currencies: action.payload };
    default:
      return state;
  }
};

export default walletReducer;
