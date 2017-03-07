import * as types from '../constants/actionTypes';
// import initialState from './initialState';

const uploadFiles = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_FILES_SUCCESS: {
      return action.files;
    }
    case types.UPLOAD_FILES_SUCCESS: {
      return [
        ...state,
        Object.assign({}, action.file),
      ];
    }
    default:
      return state;
  }
};

export default uploadFiles;
