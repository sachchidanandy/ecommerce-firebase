import * as ActionType from '../constants/ActionType';
import initialStore from './initialStoreState';

export default function productReducer(state = initialStore.cart, action) {
    switch (action.type) {
        case ActionType.FETCH_CART_PRODUCT:
            return action.newCart;
        
        default:
            return state;
    }
}