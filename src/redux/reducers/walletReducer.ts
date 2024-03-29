import { WalletType } from '../../@types/WalletType';
import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  LOAD_CURRENCIES,
  REMOVE_EXPENSE,
  START_EDIT_EXPENSE,
} from '../actions';
import WalletActions from '../../@types/WalletActions';

const initialState: WalletType = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case START_EDIT_EXPENSE:
      return { ...state, editor: true, idToEdit: action.payload };
    case EDIT_EXPENSE:
      return { ...state, expenses: action.payload, editor: false };
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
