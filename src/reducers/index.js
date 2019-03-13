import {combineReducers} from 'redux';
import user from './userReducer';
import products from './productReducer';
import cart from './cartReducer';

//Note the name we are giving here is used to access values state.courses.anyPropertyName
const rootReducer = combineReducers({
    user,
    products,
    cart
});

export default rootReducer;