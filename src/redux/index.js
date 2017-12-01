import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware)

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),enhancer)
window.store = store

sagaMiddleware.run(rootSaga)

export default store