import * as actionTypes from './actionTypes';

export const signInRedirect = (uid) => {
    return {
        type: actionTypes.START_HOME,
    };
}

export const setUpUserAction = (uid) => {
    return {
        type: actionTypes.SET_UP_USER,
        payload: {
            uid: uid
        }
    };
}

export const signOutUserAction = () => {
    return {
        type: actionTypes.SIGN_OUT_USER,
        payload: {
        }
    };
}

export const signInUserAction = (email, password, rememberMe) => {
    return {
        type: actionTypes.SIGN_IN_USER,
        payload: {
            email: email,
            password: password,
            rememberMe: rememberMe
        }
    };
}
