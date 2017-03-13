import * as types from '../constants/actionTypes';

/**
 * 
 * 
 * @param {Array} [state=[]] 
 * @param {object} action 
 * @returns siteVersions state
 */
const siteVersions = (state = [], action) => {
  /**
   * switch b/w action types
   */
  switch (action.type) {
    case types.LOAD_SITEVERSIONS: {
      return action.siteVersions;
    }
    case types.CREATE_SITEVERSIONS: {
      return [
        ...state,
        Object.assign({}, action.siteVersion),
      ];
    }
    case types.UPDATE_SITEVERSIONS: {
      return state.map(item => {
        if (item.id !== action.siteVersion.id) {
          return item;
        }
        return {
          ...item,
          ...action.siteVersion
        };
      });
    }
    case types.DELETE_SITEVERSIONS: {
      return state.filter(obj => obj.id !== action.siteVersion.id);
    }
    default:
      return state;
  }
};

export default siteVersions;