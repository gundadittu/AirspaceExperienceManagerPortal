import * as actionTypes from '../actions/actionTypes';
import { updateObject, updateObjectInArray } from '../utility';

const initialState = {
    error: null,
    packageList: null
};

const reducer = (state = initialState, action) => {
    console.log('reducer');
    console.log(action.type);
    switch (action.type) {
        case actionTypes.LOAD_SERVICE_PACKAGES_SUCCESS:
            const packages = action.payload.servicePackages || null;
            return updateObject(state, { packageList: packages });
        case actionTypes.LOAD_SERVICE_PACKAGES_ERROR:
            console.log('load service packages error');
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
        case actionTypes.LOAD_SERVICE_PACKAGE_SUCCESS:
            const loadedServicePackage = action.payload || null;
            if (loadedServicePackage === null) {
                return state
            }
            return updateObject(state, {currentServicePackage: loadedServicePackage });
        case actionTypes.LOAD_SERVICE_PACKAGE_ERROR:
            console.log('service packaged loaded unsuccessfully');
            const loadServicePackageErrorPayload = action.payload || null;
            return loadServicePackageErrorPayload;
        case actionTypes.EDIT_SERVICE_PACKAGE_STATUS_ERROR:
            console.log('service packaged status edited unsuccessfully');
            const editServicePackageStatusErrorPayload = action.payload || null;
            return editServicePackageStatusErrorPayload;
        case actionTypes.SET_CURRENT_SERVICE_PACKAGE_UID:
            const servicePackageUID = action.payload || null;
            if (servicePackageUID === null){
                return state;
            }
            return updateObject(state, { currentServicePackageUID : servicePackageUID });
       
        default:
            return state;
    }
};

export default reducer;
