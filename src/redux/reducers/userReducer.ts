import { UserType } from '../../@types/UserType';
import { LOGIN } from '../actions';
import { UserActions } from '../../@types/UserActions';

const initialState: UserType = {
  email: '',
};

const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
