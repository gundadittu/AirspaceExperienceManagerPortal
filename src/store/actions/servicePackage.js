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

export const setCurrentServicePackageUID = (servicePackageUID) => {
  return {
    type: actionTypes.SET_CURRENT_SERVICE_PACKAGE_UID,
    payload: {
      servicePackageUID: servicePackageUID
    }
  };
}

export const loadPackage = (servicePackageUID) => {
  return {
    type: actionTypes.LOAD_PACKAGE,
    payload: {
      servicePackageUID: servicePackageUID
    }
  }
}
