import * as ActionType from '../constants/ActionType';
import initialStore from './initialStoreState';

export default function productReducer(state = initialStore.ProductsData, action) {
    switch (action.type) {
        case ActionType.PRODUCT_FETCH:
            return action.products;
        
        default:
            return state;
    }
}