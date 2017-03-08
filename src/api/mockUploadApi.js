import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const files = [];

class UploadApi {
	static incrementId() {
		if (!this.latestId) this.latestId = 1;
		else this.latestId++;
		return this.latestId;
	}

	static getAllfiles() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(Object.assign([], files));
			}, delay);
		});
	}

	static uploadFile(file) {
		const fls = file.files.map(value => Object.assign({}, value));
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