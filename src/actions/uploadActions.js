import * as types from '../constants/actionTypes';
import MockUploadApi from './../api/mockUploadApi';

export function loadFilesSuccess(files) {
  return { type: types.LOAD_FILES_SUCCESS, files };
}

export function uploadFilesSuccess(file) {
  return { type: types.UPLOAD_FILES_SUCCESS, file };
}

export function loadFiles() {
  return (dispatch) => {
    return MockUploadApi.getAllfiles().then(files => {
      dispatch(loadFilesSuccess(files));
    }).catch(error => {
      throw (error);
    });
  };
}

export function uploadFiles(data) {
  return (dispatch) => {
    return MockUploadApi.uploadFile(data).then(file => {
      dispatch(uploadFilesSuccess(file));
    }).catch(error => {
      throw (error);
    });
  };
}