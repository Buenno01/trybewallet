import { AnyAction } from 'redux';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
