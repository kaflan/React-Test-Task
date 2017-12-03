import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import {routerReducer as router} from 'react-router-redux'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import coinReducer, {moduleName as coinModule} from '../ducks/coins';
export default combineReducers({
    form,
    router,
    [authModule]: authReducer,
    [coinModule]: coinReducer
})