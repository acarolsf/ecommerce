import { combineReducers } from 'redux';
import productsReducer from './products/products.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer,
    productsData: productsReducer
});