import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productReducers from './productReducers';

export default combineReducers({
    auth : authReducer,
    errors : errorReducer,
    product : productReducers,
});