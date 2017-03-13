import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const siteVersions = [];

//This would be performed on the server in a real app. Just stubbing in.
/**
 * 
 * 
 * @class SiteVersionApi
 */
class SiteVersionApi {
  /**
   * 
   * 
   * @static
   * @returns 
   * 
   * @memberOf SiteVersionApi
   */
  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
  /**
   * 
   * 
   * @static
   * @returns all siteVersion
   * 
   * @memberOf SiteVersionApi
   */
  static getAllSiteVersions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], siteVersions));
      }, delay);
    });
  }

  /**
   * 
   * 
   * @static
   * @param {object} siteVersion 
   * @returns prmise with added or updated siteVersion
   * 
   * @memberOf SiteVersionApi
   */
  static saveSiteVersion(siteVersion) {
    siteVersion = Object.assign({}, siteVersion); // to avoid manipulating object passed in.
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate server-side validation
        if (siteVersion.id) {
          const existingSiteVersionIndex = siteVersions.findIndex(a => a.id == siteVersion.id);
          siteVersions.splice(existingSiteVersionIndex, 1, siteVersion);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new siteVersions in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          siteVersion.id = this.incrementId();
          siteVersions.push(siteVersion);
        }
        resolve(siteVersion);
      }, delay);
    });
  }

  /**
   * 
   * 
   * @static
   * @param {number} siteVersionId 
   * @returns promise with null object
   * 
   * @memberOf SiteVersionApi
   */
  static deleteSiteVersion(siteVersionId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfSiteVersionToDelete = siteVersions.findIndex(siteVersion => {
          siteVersion.id == siteVersionId;
        });
        siteVersions.splice(indexOfSiteVersionToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default SiteVersionApi;