import * as ActionType from '../constants/ActionType';

export function fetchProductSuccess (products) {
    return {type : ActionType.PRODUCT_FETCH, products};
}

export function fetchProducts () {
    return function (dispatch) {
        return fetch('http://localhost:3001/ProductData').then(response => response.json()).then(data => {
            dispatch(fetchProductSuccess(data));
        }).catch(err => { throw err})
    };
}