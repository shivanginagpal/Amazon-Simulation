import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];
const storeEnhancers = (typeof window !== 'undefined' && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_) || compose

  const store = createStore(
    rootReducer,
    initialState,
    storeEnhancers(applyMiddleware(...middleware))
  );

export default store;