import { combineReducers } from 'redux';
import { modes } from './modeReducer';
import { versions } from './versionReducer';
import siteVersion from './siteVersionReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  modes,
  versions,
  siteVersion,
  routing: routerReducer
});

export default rootReducer;
