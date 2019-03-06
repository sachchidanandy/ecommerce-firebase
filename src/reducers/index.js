import {combineReducers} from 'redux';
import user from './userReducer';
import products from './productReducer';

//Note the name we are giving here is used to access values state.courses.anyPropertyName
const rootReducer = combineReducers({
    user,
    products
});

export default rootReducer;