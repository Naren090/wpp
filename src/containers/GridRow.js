import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const GridRow = props => {
	const handleUpdateVersion = (searchText) => {
		const sv = { ...props.siteVersion, versionValue: searchText };
		props.updateSiteVersion(sv);
	};
	const handleUpdateMode = (searchText) => {
		const sv = { ...props.siteVersion, modeValue: searchText };
		props.updateSiteVersion(sv);
	};
	const onCheckActive = (e, isInputChecked) => {
		const sv = { ...props.siteVersion, isActive: isInputChecked };
		props.updateSiteVersion(sv);
	};
	return (
		<TableRow id={props.siteVersion.id}>
			<TableRowColumn>
				<AutoComplete
					name="version"
					hintText="Select Site Vesion"
					filter={AutoComplete.caseInsensitiveFilter}
					openOnFocus={true}
					dataSource={props.versions}
					searchText={props.siteVersion.versionValue}
					onUpdateInput={handleUpdateVersion}
				/>
			</TableRowColumn>
			<TableRowColumn>
				<AutoComplete
					name="mode"
					hintText="Select Site Mode"
					filter={AutoComplete.caseInsensitiveFilter}
					openOnFocus={true}
					dataSource={props.modes}
					searchText={props.siteVersion.modeValue}
					onUpdateInput={handleUpdateMode}
				/>
			</TableRowColumn>
			<TableRowColumn style={{ width: 24 }}>
				<Checkbox
					label=""
					onCheck={onCheckActive}
					disabled={props.siteVersion.versionValue === '' || props.siteVersion.modeValue === ''}
					defaultChecked={props.siteVersion.isActive}
				/>
			</TableRowColumn>
			<TableRowColumn style={{ width: 24 }}>
				<IconButton onClick={() => props.deleteRow(props.siteVersion)}>
					<ContentRemove />
				</IconButton>
			</TableRowColumn>
		</TableRow>
	);
};

GridRow.propTypes = {
	versions: PropTypes.array.isRequired,
	modes: PropTypes.array.isRequired,
	siteVersion: PropTypes.object.isRequired,
	deleteRow: PropTypes.func.isRequired,
	updateSiteVersion: PropTypes.func.isRequired,
};

export default GridRow;