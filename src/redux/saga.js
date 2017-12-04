import {saga as authSaga} from '../ducks/auth'
import {saga as coinSaga} from '../ducks/coins'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
    yield all([
        authSaga(),
        coinSaga()
    ])
}