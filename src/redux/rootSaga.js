import { all, call } from 'redux-saga/effects';
import orderSagas from './orders/orders.sagas';
import productsSagas from './products/products.sagas';
import userSagas from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(productsSagas),
        call(orderSagas)
    ]);
}