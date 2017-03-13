import * as types from '../constants/actionTypes';
import MockModeApi from './../api/mockModeApi';
import MockVersionApi from './../api/mockVersionApi';
import MockSiteVersionApi from './../api/mockSiteVersionApi';

/**
 * 
 * 
 * @export
 * @param {Array} modes 
 * @returns LOAD_MODES and all modes array
 */
export function loadModesSuccess(modes) {
  return { type: types.LOAD_MODES, modes };
}

/**
 * 
 * 
 * @export
 * @param {Array} versions 
 * @returns LOAD_VERSIONS and all versions array
 */
export function loadVersionsSuccess(versions) {
  return { type: types.LOAD_VERSIONS, versions };
}

/**
 * 
 * 
 * @export
 * @param {Array} siteVersions 
 * @returns LOAD_SITEVERSIONS and all siteVersions array
 */
export function loadSiteVersionsSuccess(siteVersions) {
  return { type: types.LOAD_SITEVERSIONS, siteVersions };
}

/**
 * 
 * 
 * @export
 * @param {object} siteVersion 
 * @returns CREATE_SITEVERSIONS with created siteVersion object
 */
export function addSiteVersionSuccess(siteVersion) {
  return { type: types.CREATE_SITEVERSIONS, siteVersion };
}

/**
 * 
 * 
 * @export
 * @param {object} siteVersion 
 * @returns UPDATE_SITEVERSIONS with updated siteVersion object
 */
export function updateSiteVersionSuccess(siteVersion) {
  return { type: types.UPDATE_SITEVERSIONS, siteVersion };
}

/**
 * 
 * 
 * @export
 * @param {object} siteVersion 
 * @returns DELETE_SITEVERSIONS with deleted siteVersion object
 */
export function deleteSiteVersionSuccess(siteVersion) {
  return { type: types.DELETE_SITEVERSIONS, siteVersion };
}

/**
 * 
 * 
 * @export
 * @returns if success then dispatch loadModesSuccess else throw error
 */
export function loadModes() {
  return (dispatch) => {
    return MockModeApi.getAllModes().then(modes => {
      dispatch(loadModesSuccess(modes));
    }).catch(error => {
      throw (error);
    });
  };
}

/**
 * 
 * 
 * @export
 * @returns if success then dispatch loadVersionsSuccess else throw error
 */
export function loadVersions() {
  return (dispatch) => {
    return MockVersionApi.getAllVersions().then(versions => {
      dispatch(loadVersionsSuccess(versions));
    }).catch(error => {
      throw (error);
    });
  };
}

/**
 * 
 * 
 * @export
 * @returns if success then dispatch loadSiteVersionsSuccess else throw error
 */
export function loadSiteVersions() {
  return (dispatch) => {
    return MockSiteVersionApi.getAllSiteVersions().then(sv => {
      dispatch(loadSiteVersionsSuccess(sv));
    }).catch(error => {
      throw (error);
    });
  };
}


/**
 * 
 * 
 * @export
 * @param {object} siteVersion 
 * @returns if success then dispatch addSiteVersion else throw error
 */
export function addSiteVersion(siteVersion) {
  return (dispatch) => {
    return MockSiteVersionApi.saveSiteVersion(siteVersion).then(sv => {
      dispatch(addSiteVersionSuccess(sv));
    }).catch(error => {
      throw (error);
    });
  };
}

/**
 * 
 * 
 * @export
 * @param {object} siteVersion 
 * @returns if success then dispatch updateSiteVersionSuccess else throw error
 */
export function updateSiteVersion(siteVersion) {
  return (dispatch) => {
    return MockSiteVersionApi.saveSiteVersion(siteVersion).then(sv => {
      dispatch(updateSiteVersionSuccess(sv));
    }).catch(error => {
      throw (error);
    });
  };
}

/**
 * 
 * 
 * @export
 * @param {object} siteVersion 
 * @returns if success then dispatch deleteSiteVersionSuccess else throw error
 */
export function deleteSiteVersion(siteVersion) {
  return (dispatch) => {
    return MockSiteVersionApi.deleteSiteVersion(siteVersion).then(() => {
      dispatch(deleteSiteVersionSuccess(siteVersion));
    }).catch(error => {
      throw (error);
    });
  };
}
