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

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (mode) => {
  return mode.firstName.toLowerCase() + '-' + mode.lastName.toLowerCase();
};

class ModeApi {
  static getAllModes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], modes));
      }, delay);
    });
  }

  static saveMode(mode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minModeNameLength = 3;
        if (mode.firstName.length < minModeNameLength) {
          reject(`First Name must be at least ${minModeNameLength} characters.`);
        }

        if (mode.lastName.length < minModeNameLength) {
          reject(`Last Name must be at least ${minModeNameLength} characters.`);
        }

        if (mode.id) {
          const existingModeIndex = modes.findIndex(a => a.id == mode.id);
          modes.splice(existingModeIndex, 1, mode);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new modes in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          mode.id = generateId(mode);
          modes.push(mode);
        }

        resolve(Object.assign({}, mode));
      }, delay);
    });
  }

  static deleteMode(modeId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfModeToDelete = modes.findIndex(mode => {
          mode.modeId == modeId;
        });
        modes.splice(indexOfModeToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ModeApi;