import {CognitoUser, AuthenticationDetails, CognitoUserPool} from 'amazon-cognito-identity-js';
import {all, call, put} from 'redux-saga/effects';
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
    error: null
}, action) {
    const {type, payload, error} = action;
    switch (type) {
        case SIGN_IN_REQUEST:
            return state.set('loading', true);
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                IdToken: payload.IdToken,
                AccessToken: payload.AccessToken,
                error: null
            };
        case SIGN_IN_ERROR:
            return {...state, error};
        default:
            return state
    }
};
function Auth(username, password) {
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
}
export const signInSaga = function* (username , password) {
    // while (true) {
        try {
            const response = yield call(Auth, username, password);
            yield put({type: SIGN_IN_SUCCESS, payload: response});
            yield put(push('/coin'));
        } catch (e) {
            yield put({
                type: SIGN_IN_ERROR,
                error: e
            });
        }
    // }
};

export const saga = function* () {
    yield all([
        signInSaga()
    ]);
};