import * as actionTypes from '../actions/actionTypes';
import { updateObject, updateObjectInArray } from '../utility';

const initialState = {
    error: null,
    packageList: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_SERVICE_PACKAGES_SUCCESS:
            const packages = action.payload.servicePackages || null;
            return updateObject(state, { packageList: packages });
        case actionTypes.LOAD_SERVICE_PACKAGES_ERROR:
            const errorMessage = action.payload.error|| null;
            return updateObject(state, { error : errorMessage});
        case actionTypes.EDIT_SERVICE_PACKAGE_STATUS_SUCCESS:
            const servicePackagePayload = action.payload || null;
            if (servicePackagePayload === null) {
                return state
            }
            const id = servicePackagePayload.servicePackageUID || null;
            const newStatus = servicePackagePayload.status || null;
            const mostRecentUpdate = servicePackagePayload.mostRecentUpdate || null;
            if (id === null || newStatus == null || mostRecentUpdate == null) {
                return state
            }
            const updatedServicePackages = updateObjectInArray(state.packageList, id, {status: newStatus, mostRecentUpdate: mostRecentUpdate})
            return updateObject(state, { packageList : updatedServicePackages});
        case actionTypes.EDIT_SERVICE_PACKAGE_STATUS_ERROR:
            console.log('service packaged status edited unsuccessfully');
            const editServicePackageStatusErrorPayload = action.payload || null;
            return editServicePackageStatusErrorPayload;
        default:
            return state;
    }
};

export default reducer;
