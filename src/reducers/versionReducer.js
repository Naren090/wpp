import * as types from '../constants/actionTypes';
// import initialState from './initialState';

export const versions = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_VERSIONS:
      return action.versions;
    default:
      return state;
  }
};
