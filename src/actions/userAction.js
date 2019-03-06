import * as ActionType from '../constants/ActionType';
import UserAPI from '../demoAPI/userAPI';

function loginUserSuccess (user) {
    return {type : ActionType.LOGIN_USER, user}
}

function registerUserSuccess (user) {
    return {type : ActionType.LOGIN_USER, user}
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

export function fetchUser(email) {
    return function (dispatch) {
        return UserAPI.fetchUser(email).then (user => {
            dispatch(loginUserSuccess(user));
        }).catch ((error) => {
            throw error;
        }); 
    }
}
export function loginUser(user) {
    return function (dispatch) {
        return UserAPI.login(user).then (user => {
            dispatch(loginUserSuccess(user));
        }).catch ((error) => {
            throw error;
        });
    };
}

export function registerUser(user) {
    return function (dispatch) {
        return UserAPI.saveUser(user).then (user => {
            dispatch(registerUserSuccess(user));
        }).catch ((error) => {
            throw error;
        });
    };
}

export function addToCart(userID, product) {
    return function (dispatch) {
        return UserAPI.addToCart(userID, product).then (cart => {
            dispatch(addToCardSuccess(cart));
        }).catch((error) => {
            throw error;
        });
    };
}

export function deleteFromCart (userID, productSku) {
    return function (dispatch) {
        return UserAPI.deleteFromCart(userID, productSku).then (cart => {
            dispatch(deleteProductSuccess(cart));
        }).catch ((error) => {
            throw error;
        })
    }
}

export function buyProducts(userID, inCartProducts) {
    return function (dispatch) {
        return UserAPI.buyProducts(userID, inCartProducts).then ( lastOrder => {
            dispatch(buyProductsSuccess(lastOrder));
        }).catch (error => {
            throw error;
        })
    }
}