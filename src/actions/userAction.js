import * as ActionType from '../constants/ActionType';
import UserAPI from '../demoAPI/userAPI';
import { firestore } from '../config/FirebaseConfig';

function fetchUserSuccess (user) {
    return {type : ActionType.FETCH_USER, user}
}

function addToCardSuccess(cart) {
    return {type : ActionType.ADD_TO_CART, cart}
}

function deleteProductSuccess(cart) {
    return {type : ActionType.DELETE_PRODUCT, cart}
}

function buyProductsSuccess(lastOrder) {
    return {type : ActionType.BUY_PRODUCT, lastOrder}
}

//Fetch User details
export function fetchUser(userId) {
    return function (dispatch) {
        return firestore.collection('users').doc(`${userId}`).get()
        .then (doc => {
            return doc.data();
        }).then( user => {
            dispatch(fetchUserSuccess(user));
        }).catch ((error) => {
            throw error;
        }); 
    }
}

// export function addToCart(userID, product) {
//     return function (dispatch) {
//         return UserAPI.addToCart(userID, product).then (cart => {
//             dispatch(addToCardSuccess(cart));
//         }).catch((error) => {
//             throw error;
//         });
//     };
// }

// export function deleteFromCart (userID, productSku) {
//     return function (dispatch) {
//         return UserAPI.deleteFromCart(userID, productSku).then (cart => {
//             dispatch(deleteProductSuccess(cart));
//         }).catch ((error) => {
//             throw error;
//         })
//     }
// }

// export function buyProducts(userID, inCartProducts) {
//     return function (dispatch) {
//         return UserAPI.buyProducts(userID, inCartProducts).then ( lastOrder => {
//             dispatch(buyProductsSuccess(lastOrder));
//         }).catch (error => {
//             throw error;
//         })
//     }
// }