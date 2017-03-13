import * as types from '../constants/actionTypes';
// import initialState from './initialState';

export /**
 * 
 * 
 * @param {Array} [state=[]] 
 * @param {any} action 
 * @returns versions state
 */
const versions = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_VERSIONS:
      return action.versions;
    default:
      return state;
  }
};