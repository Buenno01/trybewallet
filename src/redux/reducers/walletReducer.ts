import { WalletType } from '../../@types/WalletType';
import { ADD_EXPENSE, LOAD_CURRENCIES } from '../actions';
import WalletActions from '../../@types/WalletActions';
import mockExpenses from '../../tests/helpers/mockExpenses';

const initialState: WalletType = {
  currencies: [],
  expenses: mockExpenses,
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
