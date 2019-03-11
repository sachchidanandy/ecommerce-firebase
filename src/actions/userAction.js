import * as ActionType from '../constants/ActionType';
import UserAPI from '../demoAPI/userAPI';
import firebase, { firestore } from '../config/FirebaseConfig';


function fetchUserSuccess (user) {
    return {type : ActionType.FETCH_USER, user}
}

function addToCartSuccess(cart) {
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
            return Object.assign({},doc.data(),{id : userId});
        }).then( user => {
            dispatch(fetchUserSuccess(user));
        }).catch ((error) => {
            throw error;
        }); 
    }
}

export function addToCart(userId, product) {
    return function (dispatch) {
        return firestore.collection('users').doc(`${userId}`).update({
            inCart : firebase.firestore.FieldValue.arrayUnion({
                product : firestore.doc(`products/${product.id}`),
                quantity : product.quantity
            })
        }).then (() => {
            dispatch(addToCartSuccess({
                product :  product.id,
                quantity : product.quantity
            }));
        }).catch((error) => {
            throw error;
        });
    };
}

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