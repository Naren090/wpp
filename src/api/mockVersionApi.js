import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const versions = [
  {
    value: 'cory-house',
    text: 'Cory',
  },
  {
    value: 'scott-allen',
    text: 'Scott',
  },
  {
    value: 'dan-wahlin',
    text: 'Dan',
  }
];


/**
 * 
 * 
 * @class VersionApi
 */
class VersionApi {
  /**
   * 
   * 
   * @static
   * @returns all the versions
   * 
   * @memberOf VersionApi
   */
  static getAllVersions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], versions));
      }, delay);
    });
  }
}

export default VersionApi;