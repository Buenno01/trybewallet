import { composeWithDevTools } from '@redux-devtools/extension';
import { combineReducers, legacy_createStore as createStore } from 'redux';

const rootReducer = combineReducers({});

// configure aqui sua store
const store = createStore(rootReducer, composeWithDevTools());

export default store;
