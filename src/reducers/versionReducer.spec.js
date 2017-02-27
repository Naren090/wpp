import { versions } from './versionReducer';
import * as types from '../constants/actionTypes';

describe('mode reducer', () => {
	it('should return the initial state', () => {
		expect(
			versions(undefined, {})
		).toEqual([]);
	});
	it('should handle load versions', () => {
		expect(
			versions([], {
				type: types.LOAD_VERSIONS,
				versions: [
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
				]
			})
		).toEqual(
			[
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
			]
			);
	});

});