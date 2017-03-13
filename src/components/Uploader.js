import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
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

/**
 * 
 * 
 * @export
 * @class Uploader
 * @extends {Component}
 */
export class Uploader extends Component {
	/**
	 * Creates an instance of Uploader.
	 * @param {any} props 
	 * 
	 * @memberOf Uploader
	 */
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
		this.deleteFile = this.deleteFile.bind(this);
	}

	/**
	 * 
	 * 
	 * @param {any} acceptedFiles 
	 * 
	 * @memberOf Uploader
	 */
	onDrop(acceptedFiles) {
		const files = [...this.state.data.files, ...acceptedFiles];
		const data = { ...this.state.data, files };
		this.setState({
			isZipFileAvailable: data.files.find(x => x.type === "application/x-zip-compressed" || x.type === "application/zip") !== undefined,
			isPDFFileAvailable: data.files.find(x => x.type === "application/pdf") !== undefined,
			data
		});
		this.props.onDataChange(data);
	}
	
	/**
	 * 
	 * 
	 * 
	 * @memberOf Uploader
	 */
	onOpenClick() {
		this.dropzone.open();
	}
	/**
	 * 
	 * 
	 * @param {any} e 
	 * @param {any} isInputChecked 
	 * 
	 * @memberOf Uploader
	 */
	onZipCheck(e, isInputChecked) {
		const data = { ...this.state.data, ZipCheck: !isInputChecked };
		this.setState({ data });
		this.props.onDataChange(data);
	}
	/**
	 * 
	 * 
	 * @param {any} e 
	 * @param {any} isInputChecked 
	 * 
	 * @memberOf Uploader
	 */
	onPDFCheck(e, isInputChecked) {
		const data = { ...this.state.data, PDFCheck: !isInputChecked };
		this.setState({ data });
		this.props.onDataChange(data);
	}
	/**
	 * 
	 * 
	 * @param {any} file 
	 * 
	 * @memberOf Uploader
	 */
	deleteFile(file) {
		const files = this.state.data.files.filter(obj => obj !== file);
		const data = { ...this.state.data, files };
		this.setState({
			isZipFileAvailable: data.files.find(x => x.type === "application/x-zip-compressed" || x.type === "application/zip") !== undefined,
			isPDFFileAvailable: data.files.find(x => x.type === "application/pdf") !== undefined,
			data
		});
		this.props.onDataChange(data);
	}

	/**
	 * 
	 * 
	 * @returns 
	 * 
	 * @memberOf Uploader
	 */
	render() {

		return (
			<div>
				<Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} multiple={this.state.multiple} style={style}>
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 8 }} >
						<p>Drag and Drop assets here / Click inside the dotted area / Browse</p>
						<RaisedButton primary={true} label="Browse File"  labelStyle={{ textTransform: 'none' }} />
					</div>
				</Dropzone>
				{
					this.state.isZipFileAvailable ? <Checkbox label="Extract zip content" onCheck={this.onZipCheck} /> : null
				}
				{
					this.state.isPDFFileAvailable ? <Checkbox label="Display PDF in viewer" onCheck={this.onPDFCheck} /> : null
				}
				<div style={this.state.data.files.length > 0 ? { height: 150, overflowX: 'auto' } : {}}>
					{this.state.data.files.length > 0 ? <List style={{ margin: 8 }}>{this.state.data.files.map((file, i) => { return <div key={i}><ListItem primaryText={file.name} rightIcon={<ActionDelete onClick={() => this.deleteFile(file)} />} /><Divider /></div>; })}</List> : null}
				</div>
			</div>
		);
	}
}

Uploader.propTypes = {
	onDataChange: PropTypes.func.isRequired,
	multiple: PropTypes.bool,
};

export default Uploader;