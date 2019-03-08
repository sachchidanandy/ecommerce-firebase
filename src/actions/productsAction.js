import * as ActionType from '../constants/ActionType';
import { firestore } from '../config/FirebaseConfig';

export function fetchProductSuccess (products) {
    return {type : ActionType.PRODUCT_FETCH, products};
}

export function fetchProducts () {
    let ProductData = {
        Products : [],
        FilterList : {
            brand : [],
            flavour : [],
            packSize :  []
        }
    }
    return function (dispatch) {
        return firestore.collection('products').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                ProductData.Products.push(doc.data());
            });
        }).then(() => firestore.collection('brands').get())
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                ProductData.FilterList.brand.push(doc.data());
            });
        }).then(() => firestore.collection('flavours').get())
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                ProductData.FilterList.flavour.push(doc.data());
            });
        }).then(() => firestore.collection('packSize').get())
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                ProductData.FilterList.packSize.push(doc.data());
            });
            console.log(ProductData);
        }).then(() => dispatch(fetchProductSuccess(ProductData)))
        .catch(err => { throw err});
    };
}