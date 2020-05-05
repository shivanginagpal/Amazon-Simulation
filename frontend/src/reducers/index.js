import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import productReducers from './productReducers';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    auth : authReducer,
    errors : errorReducer,
    profile : profileReducer,
    products : productReducers,
    cartReducer : cartReducer,
    orderReducer : orderReducer
});