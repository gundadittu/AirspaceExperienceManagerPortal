import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import "firebase/functions";

export function* loadServicePackagesWatchSaga() {
    console.log('saga detects load service package call');
    yield takeLatest(actionTypes.LOAD_SERVICE_PACKAGES, loadServicePackagesWorkerSaga);
}

function* loadServicePackagesWorkerSaga(action) {
    console.log('in worker saga function')
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(loadServicePackages, firebase);
        yield put({
            type: actionTypes.LOAD_SERVICE_PACKAGES_SUCCESS,
            payload: { service_packages: response }
        });
    } catch(error) {
        yield put({
            type: actionTypes.LOAD_SERVICE_PACKAGES_ERROR,
            payload: { error: error }
        });
    }
}

function loadServicePackages(firebase) {
    console.log('in saga function');
    const apiCall = firebase.functions.httpsCallable('getAllServicePackagesForExperienceManager')
    console.log('in saga function after firebase function call');
    return apiCall({})
        .then( result => {
            //console.log(result)
            console.log(result.data);
            return result.data;
            /*
            var notifications = [];
            for (let key in data) {
                const value = data[key];
                const not = new AirNotification(value) || null;
                if (not !== null) {
                    notifications.push(not);
                }
            }
            return notifications;
            */
    })
}
