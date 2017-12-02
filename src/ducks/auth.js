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
    const userData = {
        Username : email,
        Password : password
    };
    const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(userData);
    const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser(userData);
    const user = yield new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                resolve(result)
            },
            onFailure: function(err) {
                reject(err)
            }
        })
    });
}