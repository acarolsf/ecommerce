import { all, call } from 'redux-saga/effects';
import productsSagas from './products/products.sagas';
import userSagas from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(productsSagas)
    ]);
}