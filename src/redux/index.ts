import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

// configure aqui sua store
const store = createStore(rootReducer, composeWithDevTools());

export default store;
