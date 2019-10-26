import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    currentPage: null,
    error: null,
    isLoadingSignIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_OUT_USER_SUCCESS:
            return initialState;
        case actionTypes.CLEAR_REDUX_STATE:
            return initialState;
        case actionTypes.START_HOME:
            if (!state.currentPage) {
                return updateObject(state, { currentPage: 'homePageOfficeAdmin' })
            }
        case actionTypes.SIGN_IN_USER:
            return updateObject(state, { isLoadingSignIn: true });
        case actionTypes.SIGN_IN_USER_SUCCESS:
            return updateObject(state, { isLoadingSignIn: false, error: null });
        case actionTypes.SIGN_IN_USER_ERROR:
            const signInError = action.payload.error || null;
            return updateObject(state, { isLoadingSignIn: false, error: signInError });
        case actionTypes.SET_UP_USER:
            return updateObject(state, { isLoadingSignIn: true, isLoading: true });
        case actionTypes.SET_UP_USER_SUCCESS:
            return updateObject(state, { isLoadingSignIn: false, isLoading: false, error: null });
        case actionTypes.SET_UP_USER_ERROR:
            const setUpError = action.payload.error || null;
            return updateObject(state, { isLoadingSignIn: false, isLoading: false, error: setUpError });
        case actionTypes.SIGN_OUT_USER:
            return updateObject(state, { isLoading: true, error: null });
        case actionTypes.SIGN_OUT_USER_SUCCESS:
            return updateObject(state, { currentPage: null });
        case actionTypes.SIGN_OUT_USER_ERROR:
            return updateObject(state, { isLoading: false, error: null });
        case actionTypes.CHANGE_PAGE:
            const changePagePayload = action.payload || null;
            return updateObject(state, { ...changePagePayload });
        case actionTypes.LOAD_SERVICE_PACKAGES_SUCCESS:
            console.log('service packages loaded successfully');
            const servicePackagePayload = action.payload || null;
            return updateObject(state, { ...servicePackagePayload });
        case actionTypes.LOAD_SERVICE_PACKAGES_ERROR:
            console.log('service packages loaded unsuccessfully')
            const errorPayload = action.payload || null;
            return errorPayload;


        default:
            return state;
    }
};

export default reducer;
