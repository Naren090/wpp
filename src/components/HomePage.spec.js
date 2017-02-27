import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from './HomePage';

function setup() {
	const props = {
		modes: [],
		versions: [],
		siteVersion: [{
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
		}],
		actions: {
			loadModes: () => { return Promise.resolve(); },
			loadVersions: () => { return Promise.resolve(); },
			loadSiteVersions: () => { return Promise.resolve(); },
			addSiteVersion: jest.fn()
		}
	};

	const enzymeWrapper = shallow(<HomePage {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('Home page', () => {
	it('should render self and subcomponents', () => {
		const { enzymeWrapper } = setup();

		const raisedButtonProps = enzymeWrapper.find('RaisedButton').props();
		expect(raisedButtonProps.primary).toBe(true);
		expect(raisedButtonProps.label).toEqual('Add Site Version');

		const tableProps = enzymeWrapper.find('Table').props();
		expect(tableProps.selectable).toBe(false);
		expect(tableProps.height).toEqual('220px');

		expect(enzymeWrapper.find('Table').childAt(0).is('TableHeader')).toBe(true);

		expect(enzymeWrapper.find('TableHeader').childAt(0).is('TableRow')).toBe(true);

		expect(enzymeWrapper.find('TableRow').children().length).toBe(4);

		expect(enzymeWrapper.find('TableRow').childAt(0).props().children).toEqual('Version');
		expect(enzymeWrapper.find('TableRow').childAt(1).props().children).toEqual('Mode');
		expect(enzymeWrapper.find('TableRow').childAt(2).props().children).toEqual('Activate');
		expect(enzymeWrapper.find('TableRow').childAt(4).props().children).toBeUndefined();

		expect(enzymeWrapper.find('Table').childAt(1).is('TableBody')).toBe(true);
	});

	it('should call addSiteVersion', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('RaisedButton');
		input.props().onClick();
		expect(props.actions.addSiteVersion.mock.calls.length).toBe(1);
	});

	it('should load site versions', () => {
		const { enzymeWrapper } = setup();
		const tableBody = enzymeWrapper.find('Table').childAt(1);
		expect(tableBody.children().length).toBe(2);
	});
});





