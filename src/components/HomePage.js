import React, { Component, PropTypes } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as siteVersionActions from '../actions/siteVersionActions';
import * as uploadActions from '../actions/uploadActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import GridRow from '../containers/GridRow';
import { Uploader } from './Uploader';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSiteVersion: {
        versionValue: '',
        modeValue: '',
        isActive: false,
      },
      open: false,
      UploaderData: {}
    };
    this.addSiteVersion = this.addSiteVersion.bind(this);
    this.updateSiteVersion = this.updateSiteVersion.bind(this);
    this.deleteSiteVersion = this.deleteSiteVersion.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getUploaderData = this.getUploaderData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.siteVersionActions.loadModes();
    this.props.siteVersionActions.loadVersions();
    this.props.siteVersionActions.loadSiteVersions();
    this.props.uploadActions.loadFiles();
  }

  addSiteVersion(siteVersion) {
    this.props.siteVersionActions.addSiteVersion(siteVersion);
  }

  updateSiteVersion(siteVersion) {
    this.props.siteVersionActions.updateSiteVersion(siteVersion);
  }

  deleteSiteVersion(siteVersion) {
    this.props.siteVersionActions.deleteSiteVersion(siteVersion);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });

  }

  getUploaderData(UploaderData) {
    this.setState({ UploaderData });
  }

  onSubmit() {
    this.setState({ open: false });
    this.props.uploadActions.uploadFiles(this.state.UploaderData);
  }

  render() {
    const uploadedFiles = this.props.files.map((fls, i) =>
      <TableRow key={i}>
        <TableRowColumn>
          <ul>
            {
              fls.files.map((file, i) => <li key={i}>{file.name}</li>)
            }
          </ul>
        </TableRowColumn>
        <TableRowColumn>
          {fls.ZipCheck ? 'True' : 'False'}
        </TableRowColumn>
        <TableRowColumn style={{ width: 24 }}>
          {fls.PDFCheck ? 'True' : 'False'}
        </TableRowColumn>
      </TableRow>
    );

    const gridRows = this.props.siteVersion.map((sv, i) =>
      <GridRow
        key={i}
        versions={this.props.versions}
        modes={this.props.modes}
        siteVersion={sv}
        deleteRow={this.deleteSiteVersion}
        updateSiteVersion={this.updateSiteVersion}
      />
    );
    const actions = [
      <FlatButton
        key="0"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="1"
        label="Upload and Create"
        primary={true}
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton primary={true} label="Add Site Version" onClick={() => this.addSiteVersion(this.state.defaultSiteVersion)} labelStyle={{ textTransform: 'none' }} style={{ margin: '20px 0' }} />
        <Table selectable={false} height="220px" style={{ border: '1px solid rgb(224, 224, 224)' }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ textAlign: 'center' }} children="Version" className="header" />
              <TableHeaderColumn style={{ textAlign: 'center' }} children="Mode" />
              <TableHeaderColumn style={{ width: 24, textAlign: 'center' }} children="Activate" />
              <TableHeaderColumn style={{ width: 24, textAlign: 'center' }} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {gridRows}
          </TableBody>
        </Table>
        <RaisedButton label="Bulk Upload" onTouchTap={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <Uploader multiple={true} onDataChange={this.getUploaderData} />
        </Dialog>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{ textAlign: 'center' }} children="Files" />
            <TableHeaderColumn style={{ textAlign: 'center' }} children="Extract zip content" />
            <TableHeaderColumn style={{ width: 24, textAlign: 'center' }} children="Display PDF in viewer" />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {uploadedFiles}
        </TableBody>

      </div>
    );
  }
}

HomePage.propTypes = {
  modes: PropTypes.array.isRequired,
  versions: PropTypes.array.isRequired,
  siteVersion: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  siteVersionActions: PropTypes.object.isRequired,
  uploadActions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    modes: state.modes,
    versions: state.versions,
    siteVersion: state.siteVersion,
    files: state.uploadFile,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    siteVersionActions: bindActionCreators(siteVersionActions, dispatch),
    uploadActions: bindActionCreators(uploadActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
