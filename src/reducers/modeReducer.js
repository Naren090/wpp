import * as types from '../constants/actionTypes';
// import initialState from './initialState';

export const modes = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_MODES:
      return action.modes;
    default:
      return state;
  }
};
