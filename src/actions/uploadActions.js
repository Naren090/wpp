import * as types from '../constants/actionTypes';
import mockUploadApi from './../api/mockUploadApi';

export function loadFilesSuccess(files) {
  return { type: types.LOAD_FILES_SUCCESS, files };
}

export function uploadFilesSuccess(file) {
  return { type: types.UPLOAD_FILES_SUCCESS, file };
}

export function loadFiles() {
  return (dispatch) => {
    return mockUploadApi.getAllfiles().then(files => {
      dispatch(loadFilesSuccess(files));
    }).catch(error => {
      throw (error);
    });
  };
}

export function uploadFiles(data) {
  return (dispatch) => {
    return mockUploadApi.uploadFile(data).then(file => {
			console.log(file);
      dispatch(uploadFilesSuccess(file));
    }).catch(error => {
			console.log(error);
      throw (error);
    });
  };
}