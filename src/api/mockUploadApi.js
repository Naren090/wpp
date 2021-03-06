import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const files = [];

/**
 * 
 * 
 * @class UploadApi
 */
class UploadApi {
	static incrementId() {
		if (!this.latestId) this.latestId = 1;
		else this.latestId++;
		return this.latestId;
	}

	/**
	 * 
	 * 
	 * @static
	 * @returns all the uploaded files
	 * 
	 * @memberOf UploadApi
	 */
	static getAllfiles() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(Object.assign([], files));
			}, delay);
		});
	}

	/**
	 * 
	 * 
	 * @static
	 * @param {object} file 
	 * @returns promise with uploaded files
	 * 
	 * @memberOf UploadApi
	 */
	static uploadFile(file) {
		const fls = file.files.map(value => Object.assign({}, { lastModified: value.lastModified, lastModifiedDate: value.lastModifiedDate, name: value.name, type: value.type, webkitRelativePath: value.webkitRelativePath }));
		file = Object.assign({}, file, { files: fls });
		return new Promise((resolve) => {
			setTimeout(() => {
				file.id = this.incrementId();
				files.push(file);
				resolve(Object.assign({}, file));
			}, delay);
		});
	}

}

export default UploadApi;