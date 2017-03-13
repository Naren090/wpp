import * as types from '../constants/actionTypes';
import MockUploadApi from './../api/mockUploadApi';

/**
 * 
 * 
 * @export
 * @param {Array} files 
 * @returns LOAD_FILES_SUCCESS and all uploaded files
 */
export function loadFilesSuccess(files) {
  return { type: types.LOAD_FILES_SUCCESS, files };
}

/**
 * 
 * 
 * @export
 * @param {object} file 
 * @returns UPLOAD_FILES_SUCCESS type and file object
 */
export function uploadFilesSuccess(file) {
  return { type: types.UPLOAD_FILES_SUCCESS, file };
}

/**
 * 
 * 
 * @export
 * @returns if success then dispatch loadFilesSuccess else throw error
 */
export function loadFiles() {
  return (dispatch) => {
    return MockUploadApi.getAllfiles().then(files => {
      dispatch(loadFilesSuccess(files));
    }).catch(error => {
      throw (error);
    });
  };
}

/**
 * 
 * 
 * @export
 * @param {object} data 
 * @returns if success then dispatch uploadFilesSuccess else throw error
 */
export function uploadFiles(data) {
  return (dispatch) => {
    // fetch('url', { type: 'POST' })
    return MockUploadApi.uploadFile(data).then(file => {
      dispatch(uploadFilesSuccess(file));
    }).catch(error => {
      throw (error);
    });
  };
}
