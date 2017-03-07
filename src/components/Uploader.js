import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
// import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
// import ActionDelete from 'material-ui/svg-icons/action/delete';
// import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

const style = {
	width: '100%',
	height: 103,
	borderWidth: 2,
	borderColor: '#666',
	borderStyle: 'dashed',
	borderRadius: 5,
	margin: '8px 0'
};

class Uploader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				files: [],
				ZipCheck: false,
				PDFCheck: false,
			},
			isZipFileAvailable: false,
			isPDFFileAvailable: false,
			multiple: props.multiple,

		};
		this.onDrop = this.onDrop.bind(this);
		this.onOpenClick = this.onOpenClick.bind(this);
		this.onZipCheck = this.onZipCheck.bind(this);
		this.onPDFCheck = this.onPDFCheck.bind(this);
	}
	onDrop(acceptedFiles) {
    console.log(acceptedFiles);
		const data = { ...this.state.data,files: acceptedFiles };
		this.setState({
			isZipFileAvailable: acceptedFiles.find(x => x.type === "application/x-zip-compressed" || x.type === "application/zip") !== undefined,
			isPDFFileAvailable: acceptedFiles.find(x => x.type === "application/pdf") !== undefined,
			data
		});
		this.props.onDataChange(data);
	}
	onOpenClick() {
		this.dropzone.open();
	}
	onZipCheck(e, isInputChecked) {
		const data = { ...this.state.data, ZipCheck: !isInputChecked };
		this.setState({ data });
		this.props.onDataChange(data);
	}
	onPDFCheck(e, isInputChecked) {
		const data = { ...this.state.data, PDFCheck: !isInputChecked };
		this.setState({ data });
		this.props.onDataChange(data);
	}

	render() {
		// <div>
		// 			{this.state.files.length > 0 ? <List style={{ margin: 8 }}>{this.state.files.map((file, i) => { return <div key={i}><ListItem primaryText={file.name} rightIcon={<ActionDelete />} /><Divider /></div>; })}</List> : null}
		// 		</div>
		return (
			<div>
				<Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} multiple={this.state.multiple} style={style}>
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 8 }} >
						<p>Drag and drop assets here</p>
						<RaisedButton primary={true} label="Browse File" />
					</div>
				</Dropzone>
				{
					this.state.isZipFileAvailable ? <Checkbox label="Extract zip content" checked={this.state.data.ZipCheck} onCheck={this.onZipCheck} /> : null
				}
				{
					this.state.isPDFFileAvailable ? <Checkbox label="Display PDF in viewer" checked={this.state.data.PDFCheck} onCheck={this.onPDFCheck} /> : null
				}
			</div>
		);
	}
}

Uploader.propTypes = {
  onDataChange: PropTypes.func.isRequired,
	multiple: PropTypes.bool,
};

export default Uploader;