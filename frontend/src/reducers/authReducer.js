import { SET_CURRENT_USER } from '../actions/types';
import { isFieldEmpty } from '../Components/SignUp/helperApis';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action){
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isFieldEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}