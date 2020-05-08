import { PLACE_ORDER, GET_ORDER, GET_CUSTOMER_ORDERS, DELETE_ORDER_ITEM, DELETE_ORDER, GET_SELLER_ORDERS, UPDATE_ORDER_STATUS_BY_SELLER, CANCEL_ORDER_BY_SELLER } from '../actions/types';

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
        case GET_SELLER_ORDERS:
            return {
                ...state,
                allSellerOrders: action.payload,
            }
        case UPDATE_ORDER_STATUS_BY_SELLER:
            return {
                ...state,
                sellerUpdatedOrderStatus: action.payload,
            }
        case CANCEL_ORDER_BY_SELLER:
            return {
                ...state,
                cancelUpdateAllSellerOrders: action.payload,
            }
        default:
            return state;
    }
}