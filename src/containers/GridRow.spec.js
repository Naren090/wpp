import React from 'react';
import { shallow } from 'enzyme';
import GridRow from './GridRow';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

function setup() {
	const props = {
		versions: [],
		modes: [],
		siteVersion: {
			id: 1,
			versionValue: '',
			modeValue: '',
			isActive: false
		},
		deleteRow: jest.fn(),
		updateSiteVersion: jest.fn(),
	};

	const enzymeWrapper = shallow(<GridRow {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('GridRow', () => {
	it('should render self and subcomponents', () => {
		const { enzymeWrapper } = setup();

		const tableRow = enzymeWrapper.find('TableRow');
		expect(tableRow.props().id).toBe(1);

		expect(tableRow.children().length).toBe(4);

		expect(tableRow.childAt(0).childAt(0).type()).toEqual(AutoComplete);
		expect(tableRow.childAt(1).childAt(0).type()).toEqual(AutoComplete);
		expect(tableRow.childAt(2).childAt(0).type()).toEqual(Checkbox);
		expect(tableRow.childAt(3).childAt(0).type()).toEqual(IconButton);

		expect(tableRow.childAt(2).childAt(0).props().disabled).toBe(true);
	});

	it('should call updateSiteVersion on version change', () => {
		const { enzymeWrapper, props } = setup();
		const tableRow = enzymeWrapper.find('TableRow');
		const input = tableRow.childAt(0).childAt(0);
		input.props().onUpdateInput();
		expect(props.updateSiteVersion.mock.calls.length).toBe(1);
	});

	it('should call updateSiteVersion on mode change', () => {
		const { enzymeWrapper, props } = setup();
		const tableRow = enzymeWrapper.find('TableRow');
		const input = tableRow.childAt(1).childAt(0);
		input.props().onUpdateInput();
		expect(props.updateSiteVersion.mock.calls.length).toBe(1);
	});

	it('should call updateSiteVersion on isactive change', () => {
		const { enzymeWrapper, props } = setup();
		const tableRow = enzymeWrapper.find('TableRow');
		const input = tableRow.childAt(2).childAt(0);
		input.props().onCheck();
		expect(props.updateSiteVersion.mock.calls.length).toBe(1);
	});

	it('should call deleteRow on delete icon click', () => {
		const { enzymeWrapper, props } = setup();
		const tableRow = enzymeWrapper.find('TableRow');
		const input = tableRow.childAt(3).childAt(0);
		input.props().onClick();
		expect(props.deleteRow.mock.calls.length).toBe(1);
	});
});





