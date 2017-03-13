import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const modes = [
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
 * @class ModeApi
 */
class ModeApi {
  /**
   * 
   * 
   * @static
   * @returns promise with all modes
   * 
   * @memberOf ModeApi
   */
  static getAllModes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], modes));
      }, delay);
    });
  }

}

export default ModeApi;