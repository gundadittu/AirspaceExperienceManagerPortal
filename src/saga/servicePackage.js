import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import "firebase/functions";

export function* loadServicePackagesWatchSaga() {
    yield takeLatest(actionTypes.LOAD_SERVICE_PACKAGES, loadServicePackagesWorkerSaga);
}

function* loadServicePackagesWorkerSaga(action) {
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(loadServicePackages, firebase);
        yield put({
            type: actionTypes.LOAD_SERVICE_PACKAGES_SUCCESS,
            payload: { servicePackages: response }
        });
    } catch(error) {
        yield put({
            type: actionTypes.LOAD_SERVICE_PACKAGES_ERROR,
            payload: { error: error }
        });
    }
}

function loadServicePackages(firebase) {
    const apiCall = firebase.functions.httpsCallable('getAllServicePackagesForExperienceManager');
    return apiCall({})
        .then( result => {

            // console.log("loadServicePackages saga response:")
            // console.log(result.data);
            return result.data;

    })
};

export function* editServicePackageStatusWatchSaga(){
    yield takeLatest(actionTypes.EDIT_SERVICE_PACKAGE_STATUS, editServicePackageStatusWorkerSaga);
}

function* editServicePackageStatusWorkerSaga(action){
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(editServicePackageStatus, action.payload, firebase);
        yield put({
            type: actionTypes.EDIT_SERVICE_PACKAGE_STATUS_SUCCESS,
            payload: { ...response }
        });
    } catch(error) {
        yield put({
            type: actionTypes.EDIT_SERVICE_PACKAGE_STATUS_ERROR,
            payload: { error: error }
        });
    }
}

function editServicePackageStatus(payload, firebase){
    const servicePackageUID = payload.servicePackageUID || null;
    const newStatus = payload.newStatus || null;

    const apiCall = firebase.functions.httpsCallable('editServicePackageStatus');
    return apiCall({ servicePackageUID: servicePackageUID, newStatus: newStatus })
        .then( result => {
            // manipulate data here if needed
            console.log(result.data);
            return result.data
        })

}
