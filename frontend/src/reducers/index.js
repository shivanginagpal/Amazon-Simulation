import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import productReducers from './productReducers';

export default combineReducers({
    auth : authReducer,
    errors : errorReducer,
    profile : profileReducer,
    product : productReducers
});