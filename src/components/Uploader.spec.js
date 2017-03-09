import React from 'react';
import { shallow } from 'enzyme';
import { Uploader } from './Uploader';

function setupShallow() {
	const props = {
		multiple: false,
		onDataChange: jest.fn()
	};
	const enzymeWrapper = shallow(<Uploader {...props} />);
	return {
		props,
		enzymeWrapper
	};
}


describe('Uploader', () => {

	it('should render self and subcomponents', () => {
		const { enzymeWrapper, props } = setupShallow();

		const dropzon = enzymeWrapper.find('Dropzone').props();
		expect(dropzon.multiple).toBe(props.multiple);

		expect(enzymeWrapper.find('Dropzone').childAt(0).is('div')).toBe(true);
		expect(enzymeWrapper.find('Dropzone').childAt(0).is('div')).toBe(true);
		expect(enzymeWrapper.find('Dropzone').childAt(0).childAt(0).is('p')).toBe(true);
		expect(enzymeWrapper.find('Dropzone').childAt(0).childAt(1).is('RaisedButton')).toBe(true);

	});

	it('should render Extract zip content', () => {
		const { enzymeWrapper } = setupShallow();
		enzymeWrapper.setState({ isZipFileAvailable: true });
		const zipChekbox = enzymeWrapper.find('Checkbox').props();
		expect(zipChekbox.label).toBe('Extract zip content');
	});

	it('should render Display PDF in viewer', () => {
		const { enzymeWrapper } = setupShallow();
		enzymeWrapper.setState({ isPDFFileAvailable: true });
		const pdfChekbox = enzymeWrapper.find('Checkbox').props();
		expect(pdfChekbox.label).toBe('Display PDF in viewer');
	});

	it('should render both checkbox', () => {
		const { enzymeWrapper } = setupShallow();
		enzymeWrapper.setState({ isZipFileAvailable: true, isPDFFileAvailable: true });
		const zipChekbox = enzymeWrapper.find('Checkbox').at(0).props();
		const pdfChekbox = enzymeWrapper.find('Checkbox').at(1).props();
		expect(zipChekbox.label).toBe('Extract zip content');
		expect(pdfChekbox.label).toBe('Display PDF in viewer');
	});
});

