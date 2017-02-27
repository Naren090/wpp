import * as types from '../constants/actionTypes';
import * as siteVersionActions from './siteVersionActions';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async Function', () => {
	afterEach(() => {
		nock.cleanAll();
	});


	it('load modes when loading modes', () => {
		const expectedActions = [
			{ modes: [{ text: 'Cory', value: 'cory-house' }, { text: 'Scott', value: 'scott-allen' }, { text: 'Dan', value: 'dan-wahlin' }], type: types.LOAD_MODES }
		];

		const store = mockStore({ modes: [] });

		return store.dispatch(siteVersionActions.loadModes())
			.then(() => { // return of async actions
				expect(store.getActions()).toEqual(expectedActions);
			});

	});

	it('load version when loading versions', () => {
		const expectedActions = [
			{ versions: [{ text: 'Cory', value: 'cory-house' }, { text: 'Scott', value: 'scott-allen' }, { text: 'Dan', value: 'dan-wahlin' }], type: types.LOAD_VERSIONS }
		];

		const store = mockStore({ versions: [] });

		return store.dispatch(siteVersionActions.loadVersions())
			.then(() => { // return of async actions
				expect(store.getActions()).toEqual(expectedActions);
			});

	});

	it('load site version when loading site versions', () => {
		const expectedActions = [
			{ siteVersions: [], type: types.LOAD_SITEVERSIONS }
		];

		const store = mockStore({ siteVersions: [] });

		return store.dispatch(siteVersionActions.loadSiteVersions())
			.then(() => { // return of async actions
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

	it('add site version action', () => {
		const expectedActions = [
			{ siteVersion: {
				id: 1,
        versionValue: '',
        modeValue: '',
        isActive: false,
      }, type: types.CREATE_SITEVERSIONS }
		];

		const store = mockStore({ siteVersions: [] });

		return store.dispatch(siteVersionActions.addSiteVersion({
			versionValue: '',
			modeValue: '',
			isActive: false,
		}))
			.then(() => { // return of async actions
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

	it('Update Site Version action', () => {
		const expectedActions = [
			{ siteVersion: {
				id: 1,
        versionValue: '1.0',
        modeValue: '2.0',
        isActive: true,
      }, type: types.UPDATE_SITEVERSIONS }
		];

		const store = mockStore({ siteVersions: [] });

		return store.dispatch(siteVersionActions.updateSiteVersion({
			id: 1,
			versionValue: '1.0',
			modeValue: '2.0',
			isActive: true,
		}))
			.then(() => { // return of async actions
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

	it('delete Site Version action', () => {
		const expectedActions = [
			{ siteVersion: {
				id: 1,
        versionValue: '1.0',
        modeValue: '2.0',
        isActive: true,
      }, type: types.DELETE_SITEVERSIONS }
		];

		const store = mockStore({ siteVersions: [] });

		return store.dispatch(siteVersionActions.deleteSiteVersion({
			id: 1,
			versionValue: '1.0',
			modeValue: '2.0',
			isActive: true,
		}))
			.then(() => { // return of async actions
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

});
