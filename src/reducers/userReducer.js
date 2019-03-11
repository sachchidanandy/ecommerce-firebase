import * as ActionType from '../constants/ActionType';
import initialState from './initialStoreState';

export default function userReducer (state = initialState.user, action) {
    switch (action.type) {
        case ActionType.FETCH_USER :
            return  action.user;

        case ActionType.ADD_TO_CART : 
            return Object.assign({}, state, {inCart : [...state.inCart, action.cart]});
        
        case ActionType.DELETE_PRODUCT : 
            return Object.assign({}, state, {inCart : action.cart});

        case ActionType.BUY_PRODUCT :
            return Object.assign({}, state, {inCart : [], lastOrder : action.lastOrder});

        default:
            return state;
    }
}