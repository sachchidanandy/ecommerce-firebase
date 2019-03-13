import * as ActionType from '../constants/ActionType';
import { firestore } from '../config/FirebaseConfig';

function fetchCartProductSuccess(newCart) {
    return {type : ActionType.FETCH_CART_PRODUCT, newCart};
}

export function fetchCartProducts(cartList) {
    const cart = [];
    return async function(dispatch) {
        cartList.map(cartItem => {
            firestore.doc(cartItem.product.path).get()
            .then(doc => {
                cart.push({
                    product : doc.data(),
                    quantity : cartItem.quantity
                });
            }).catch ( error => {
                throw error;
            });
        });
        dispatch(fetchCartProductSuccess(cart));
        return 1;
    }
}