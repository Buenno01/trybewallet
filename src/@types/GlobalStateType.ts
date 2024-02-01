import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import rootReducer from '../redux/reducers';

export type GlobalStateType = ReturnType<typeof rootReducer>;

export type GlobalDispatch = ThunkDispatch<GlobalStateType, null, AnyAction>;
