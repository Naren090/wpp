import { modes } from './modeReducer';
import * as types from '../constants/actionTypes';

describe('mode reducer', () => {
	it('should return the initial state', () => {
		expect(
			modes(undefined, {})
		).toEqual([]);
	});
	it('should handle load modes', () => {
		expect(
			modes([], {
				type: types.LOAD_MODES,
				modes: [
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