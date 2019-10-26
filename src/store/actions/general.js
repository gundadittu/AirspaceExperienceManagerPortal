import * as actionTypes from './actionTypes';

export const loadServicePackages = () => {
  return {
    type: actionTypes.LOAD_SERVICE_PACKAGES
  };
}


export const clearReduxState = () => {
  return {
    type: actionTypes.CLEAR_REDUX_STATE,
  }
}

export const setUpFirebaseInstanceAction = (firebaseInstance) => {
  return {
    type: actionTypes.SET_UP_FIREBASE,
    payload: {
      firebase: firebaseInstance
    }
  };
}

export const changePage = (payload) => {

  const officeUID = payload.officeUID || payload.currentOfficeAdminUID || null;
  const officeObj = payload.officeObj || payload.currentOfficeAdmin || null;


  if ((officeUID !== null) && (officeObj !== null)) {
    return {
      type: actionTypes.CHANGE_PAGE,
      payload: {
        ...payload,
        currentOfficeAdminUID: officeUID,
        currentOfficeAdmin: officeObj
      }
    }
  }

  return {
    type: actionTypes.CHANGE_PAGE,
    payload: {
      ...payload
    }
  };
}

export const sendPasswordReset = (email) => {
  return {
    type: actionTypes.SEND_PASSWORD_RESET,
    payload: {
      email: email
    }
  }
}
