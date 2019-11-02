import * as actionTypes from './actionTypes';

export const loadServicePackages = () => {
  return {
    type: actionTypes.LOAD_SERVICE_PACKAGES
  };
}

export const editServicePackageStatus = (servicePackageUID, newStatus) => {
  return {
    type: actionTypes.EDIT_SERVICE_PACKAGE_STATUS,
    payload: {
      servicePackageUID: servicePackageUID,
      newStatus: newStatus
    }
  };
}
