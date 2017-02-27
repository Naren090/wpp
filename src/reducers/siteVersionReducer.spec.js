import reducer from './siteVersionReducer';
import * as types from '../constants/actionTypes';

describe('mode reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual([]);
	});
	it('should handle load site Versions', () => {
		expect(
			reducer([], {
				type: types.LOAD_SITEVERSIONS,
				siteVersions: []
			})
		).toEqual(
			[]
			);
	});
	it('should handle create site Versions', () => {
		expect(
			reducer([], {
				type: types.CREATE_SITEVERSIONS,
				siteVersion: {
					id: 1,
					versionValue: '',
					modeValue: '',
					isActive: false
				}
			})
		).toEqual(
			[{
				id: 1,
				versionValue: '',
				modeValue: '',
				isActive: false
			}]
			);
	});
	it('should handle update site Versions', () => {
		expect(
			reducer([{
				id: 1,
				versionValue: '',
				modeValue: '',
				isActive: false
			}], {
					type: types.UPDATE_SITEVERSIONS,
					siteVersion: {
						id: 1,
						versionValue: '1.0',
						modeValue: '2.0',
						isActive: true
					}
				})
		).toEqual(
			[{
				id: 1,
				versionValue: '1.0',
				modeValue: '2.0',
				isActive: true
			}]
			);

		expect(
			reducer([{
				id: 1,
				versionValue: '',
				modeValue: '',
				isActive: false
			},
			{
				id: 2,
				versionValue: '',
				modeValue: '',
				isActive: false
			}], {
					type: types.UPDATE_SITEVERSIONS,
					siteVersion: {
						id: 2,
						versionValue: '1.0',
						modeValue: '2.0',
						isActive: true
					}
				})
		).toEqual(
			[{
				id: 1,
				versionValue: '',
				modeValue: '',
				isActive: false
			},
			{
				id: 2,
				versionValue: '1.0',
				modeValue: '2.0',
				isActive: true
			}]
			);
	});
	it('should handle remove site Versions', () => {
		expect(
			reducer([{
				id: 1,
				versionValue: '1.0',
				modeValue: '2.0',
				isActive: true
			}], {
					type: types.DELETE_SITEVERSIONS,
					siteVersion: {
						id: 1,
						versionValue: '1.0',
						modeValue: '2.0',
						isActive: true
					}
				})
		).toEqual(
			[]
			);

		expect(
			reducer([{
				id: 1,
				versionValue: '',
				modeValue: '',
				isActive: false
			},
			{
				id: 2,
				versionValue: '',
				modeValue: '',
				isActive: false
			}], {
					type: types.DELETE_SITEVERSIONS,
					siteVersion: {
						id: 2,
						versionValue: '',
						modeValue: '',
						isActive: false
					}
				})
		).toEqual(
			[{
				id: 1,
				versionValue: '',
				modeValue: '',
				isActive: false
			}]
			);
	});
});