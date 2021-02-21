import ordersTypes from "./orders.types";

const INITIAL_STTATE = {
    orderHistory: [],
};
const ordersReducer = (state = INITIAL_STTATE, action) => {
    switch(action.type) {
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
            };
        default:
            return state;
    }
};

export default ordersReducer;