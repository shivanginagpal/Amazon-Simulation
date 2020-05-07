import { PLACE_ORDER, GET_ORDER, GET_CUSTOMER_ORDERS, DELETE_ORDER_ITEM, DELETE_ORDER } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case PLACE_ORDER:
            return {
                ...state,
                status: action.payload.data.status,
                orderId: action.payload.data.id
            }
        case GET_ORDER:
            return {
                ...state,
                orderDetails: action.payload,
            }
        case GET_CUSTOMER_ORDERS:
            return {
                ...state,
                allCustomerOrders: action.payload,
            }
        case DELETE_ORDER_ITEM:
            return {
                ...state,
                updatedOrderItems: action.payload,
            }
        case DELETE_ORDER:
            return {
                ...state,
                updatedOrderItems: action.payload,
            }
        default:
            return state;
    }
}