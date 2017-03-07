import { combineReducers } from 'redux';
import { modes } from './modeReducer';
import { versions } from './versionReducer';
import siteVersion from './siteVersionReducer';
import uploadFile from './uploadFileReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  modes,
  versions,
  siteVersion,
  uploadFile,
  routing: routerReducer
});

export default rootReducer;