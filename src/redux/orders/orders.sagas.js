import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth } from '../../firebase/utils';
import { clearCart } from '../cart/cart.actions';
import { setUserOrderHistory } from './orders.actions';
import { handleGetUserOrderHistory, handleSaveOrder } from './orders.helpers';
import ordersTypes from './orders.types';

export function* getUserOrderHistory({ payload }) {
    try {
        const history = yield handleGetUserOrderHistory(payload);
        yield put(
            setUserOrderHistory(history)
        );
    } catch(err) {
        console.log(err);
    }
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory)
}

export function* saveOrder({ payload }) {
    try {
        const timestamp = new Date();
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamp,
        });
        yield put(
            clearCart()
        );
    } catch (error) {
        console.log(error);
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export default function* orderSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart)
    ])
}