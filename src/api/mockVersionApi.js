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

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (version) => {
  return version.firstName.toLowerCase() + '-' + version.lastName.toLowerCase();
};

class VersionApi {
  static getAllVersions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], versions));
      }, delay);
    });
  }

  static saveVersion(version) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minVersionNameLength = 3;
        if (version.firstName.length < minVersionNameLength) {
          reject(`First Name must be at least ${minVersionNameLength} characters.`);
        }

        if (version.lastName.length < minVersionNameLength) {
          reject(`Last Name must be at least ${minVersionNameLength} characters.`);
        }

        if (version.id) {
          const existingVersionIndex = versions.findIndex(a => a.id == version.id);
          versions.splice(existingVersionIndex, 1, version);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new versions in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          version.id = generateId(version);
          versions.push(version);
        }

        resolve(Object.assign({}, version));
      }, delay);
    });
  }

  static deleteVersion(siteVersion) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfVersionToDelete = versions.findIndex(version => {
          version.versionId == siteVersion.id;
        });
        versions.splice(indexOfVersionToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default VersionApi;