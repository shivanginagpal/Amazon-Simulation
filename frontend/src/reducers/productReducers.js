import { GET_PRODUCT_CATEGORIES, GET_PRODUCTS, PRODUCT_LOADING, GET_PRODUCT, POST_PRODUCT, GET_CUSTOMER_NAME, POST_REVIEW, DELETE_PRODUCT, UPDATE_PRODUCT, UPDATE_IMAGE_PRODUCT, SET_VIEWCOUNT } from '../actions/types';

const initialState = {
    product_categories: null,
    products_items: null,
    loading: false,
    product: null,
    status: null,
    customer_name: null,
    reviewStatus: null,
    deleteStatus: null

}

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: true

            }
        case GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: false,
                product_categories: action.payload,
            }
        case GET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products_items: action.payload,
            }
        case GET_PRODUCT:
            return {
                ...state,
                loading: false,
                product: action.payload,
            }
        case POST_PRODUCT:
            return {
                ...state,
                status: action.payload,
            }
        case GET_CUSTOMER_NAME:
            return {
                ...state,
                customer_name: action.payload,
            }
        case POST_REVIEW:
            return {
                ...state,
                reviewStatus: action.payload,
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                deleteStatus: action.payload
            }
        case UPDATE_PRODUCT:
            return {
                ...state
            }
        case UPDATE_IMAGE_PRODUCT:
            return {
                ...state
            }

        case SET_VIEWCOUNT :
            return {
                ...state
            }

        default:
            return state;
    }
}