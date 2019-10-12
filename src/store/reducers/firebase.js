import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    firebase: null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_UP_FIREBASE:
            let firebase = action.payload.firebase;
            return updateObject(state, {firebase: firebase});
        default:
            return state
    }
}

export default reducer;
