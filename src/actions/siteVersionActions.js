import * as types from '../constants/actionTypes';
import MockModeApi from './../api/mockModeApi';
import MockVersionApi from './../api/mockVersionApi';
import MockSiteVersionApi from './../api/mockSiteVersionApi';

export function loadModesSuccess(modes) {
  return { type: types.LOAD_MODES, modes };
}

export function loadVersionsSuccess(versions) {
  return { type: types.LOAD_VERSIONS, versions };
}

export function loadSiteVersionsSuccess(siteVersions) {
  return { type: types.LOAD_SITEVERSIONS, siteVersions };
}

export function addSiteVersionSuccess(siteVersion) {
  return { type: types.CREATE_SITEVERSIONS, siteVersion };
}

export function updateSiteVersionSuccess(siteVersion) {
  return { type: types.UPDATE_SITEVERSIONS, siteVersion };
}

export function deleteSiteVersionSuccess(siteVersion) {
  return { type: types.DELETE_SITEVERSIONS, siteVersion };
}

export function loadModes() {
  return (dispatch) => {
    // fetch('apipath') replace with MockModeApi.getAllModes()
    return MockModeApi.getAllModes().then(modes => {
      dispatch(loadModesSuccess(modes));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadVersions() {
  return (dispatch) => {
    return MockVersionApi.getAllVersions().then(versions => {
      dispatch(loadVersionsSuccess(versions));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadSiteVersions() {
  return (dispatch) => {
    return MockSiteVersionApi.getAllSiteVersions().then(sv => {
      dispatch(loadSiteVersionsSuccess(sv));
    }).catch(error => {
      throw (error);
    });
  };
}


export function addSiteVersion(siteVersion) {
  return (dispatch) => {
    return MockSiteVersionApi.saveSiteVersion(siteVersion).then(sv => {
      dispatch(addSiteVersionSuccess(sv));
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateSiteVersion(siteVersion) {
  
  return (dispatch) => {
    return MockSiteVersionApi.saveSiteVersion(siteVersion).then(sv => {
      dispatch(updateSiteVersionSuccess(sv));
    }).catch(error => {
      throw (error);
    });
  };
}

export function deleteSiteVersion(siteVersion) {
  return (dispatch) => {
    return MockSiteVersionApi.deleteSiteVersion(siteVersion).then(() => {
      dispatch(deleteSiteVersionSuccess(siteVersion));
    }).catch(error => {
      throw (error);
    });
  };
}





