import {all, call, put, take} from 'redux-saga/effects';

export const appName = 'amazon';
export const moduleName = 'coin';

export const REQUEST = `${appName}/${moduleName}/REQUEST`;
export const SUCCESS = `${appName}/${moduleName}/SUCCESS`;
export const ERROR = `${appName}/${moduleName}/ERROR`;

export default function reducer(state = {
    currency: [],
    error: null,
    loading: false
}, action) {
    const {type, payload, error} = action;
    switch (type) {
        case REQUEST:
            return {...state, loading: true};
        case SUCCESS:
            return {
                ...state,
                currency: payload,
                error: null,
                loading: false
            };
        case ERROR:
            return {...state, error, loading: false};
        default:
            return state
    }
}

export const coinSaga = function* () {
    while (true) {
        const action = yield take(REQUEST);
        try {
            const response = yield call(fetchCoinsCurrency, action);
            yield put({type: SUCCESS, payload: response});
        } catch (e) {
            yield put({
                type: ERROR,
                error: e
            });
        }
    }
};
export const fetchCoinsCurrency = () => fetch('https://mobile.goodx.network/purses/currency');
export function getCoin() {
    return {type: REQUEST};
};

export const saga = function* () {
    yield all([
        coinSaga()
    ]);
};