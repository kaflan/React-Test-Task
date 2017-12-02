import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import {all, cps, call, put, take, takeEvery} from 'redux-saga/effects';
import {push} from 'react-router-redux';

const poolData = {
    UserPoolId : '...', // Your user pool id here
    ClientId : '...' // Your client id here
};
const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
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
            return {...state, 
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

export const signIn = function * (email, password) {
    const authenticationData  = {
        Username : email,
        Password : password
    };
    const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    const userData = {
        Username: email,
        Pool: poolData
      }
    const cognitoUser = new CognitoUser(userData);
    const requestPropmise = new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                resolve(result)
            },
            onFailure: function(err) {
                reject(err)
            }
        })
    });
    try {
        const response = yield call(requestPropmise);
        yield put({ type: SIGN_IN_SUCCESS, payload: response});
        yield put(push('/coin'));
    } catch (e){
        yield put({
            type: actions.SIGN_IN_ERROR,
            error: e
        });
    }
}