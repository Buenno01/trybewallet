import { WalletType } from '../../@types/WalletType';
import { ADD_EXPENSE, LOAD_CURRENCIES, REMOVE_EXPENSE } from '../actions';
import WalletActions from '../../@types/WalletActions';

const initialState: WalletType = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case REMOVE_EXPENSE:
      return { ...state, expenses: action.payload };
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
