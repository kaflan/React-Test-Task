import {CognitoUser, AuthenticationDetails, CognitoUserPool} from 'amazon-cognito-identity-js';
import { stopSubmit } from 'redux-form';
import {all, call, put, take} from 'redux-saga/effects';
import {push} from 'react-router-redux';

const poolData = {
    UserPoolId: 'us-east-1_UFwmlDkDN', // Your user pool id here
    ClientId: '4nsb3ahdm7tp1jn4ci5m898ei3' // Your client id here
};
// const userPool = new CognitoUserPool(poolData);
export const appName = 'amazon';
export const moduleName = 'auth';
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;

export default function reducer(state = {
    IdToken: '',
    AccessToken: '',
    error: null,
    loading: false
}, action) {
    const {type, payload, error} = action;
    switch (type) {
        case SIGN_IN_REQUEST:
            return {...state, loading:true};
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                IdToken: payload.IdToken,
                AccessToken: payload.AccessToken,
                error: null,
                loading:false
            };
        case SIGN_IN_ERROR:
            return {...state, error, loading:false};
        default:
            return state
    }
};
const Auth = (username, password) => {
    const authenticationData = {
        Username: username,
        Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username: username,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess:  (result) => resolve(result),
            onFailure: (err) => reject(err)
        })
    });
};
export function signIn(username, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: {username, password}
    }
}
export const signInSaga = function* () {
    while (true) {
        const action = yield take(SIGN_IN_REQUEST);
        const {username, password} = action.payload;
        try {
            const response = yield call(Auth, username, password);
            console.log('success');
            yield put({type: SIGN_IN_SUCCESS, payload: response});
            yield put(push('/coin'));
        } catch (e) {
            yield put(stopSubmit('auth', { username: 'User not exist',_error: 'login fail' }));
        }
    }
};

export const saga = function* () {
    yield all([
        signInSaga()
    ]);
};