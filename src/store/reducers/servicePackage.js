import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    servicePackages: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_SERVICE_PACKAGES_SUCCESS:
            const servicePackagesPayload = action.payload || null;
            return updateObject(state, { ...servicePackagesPayload });
        case actionTypes.LOAD_SERVICE_PACKAGES_ERROR:
            const errorPayload = action.payload || null;
            return errorPayload;
        case actionTypes.EDIT_SERVICE_PACKAGE_STATUS_SUCCESS:
            console.log('service package status edited successfully');
            const servicePackagePayload = action.payload || null;
            const id = servicePackagePayload.servicePackageUID;
            const newStatus = servicePackagePayload.status;
            let servicePackages = state.servicePackages;
            servicePackages.forEach( x => {
                if (x.servicePackageUID === id) {
                    x.status = newStatus
                }
            })
            return updateObject(state, { servicePackages: servicePackages });
        case actionTypes.EDIT_SERVICE_PACKAGE_STATUS_ERROR:
            console.log('service packaged status edited unsuccessfully');
            const editServicePackageStatusErrorPayload = action.payload || null;
            return editServicePackageStatusErrorPayload;


        default:
            return state;
    }
};

export default reducer;
