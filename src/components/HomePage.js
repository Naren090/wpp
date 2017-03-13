import React, { Component, PropTypes } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as siteVersionActions from '../actions/siteVersionActions';
import * as uploadActions from '../actions/uploadActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import GridRow from '../containers/GridRow';
import Uploader from './Uploader';

/**
 * 
 * 
 * @export
 * @class HomePage
 * @extends {Component}
 */
export class HomePage extends Component {
  /**
   * Creates an instance of HomePage.
   * @param {any} props 
   * 
   * @memberOf HomePage
   */
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

  /**
   * 
   * 
   * 
   * @memberOf HomePage
   */
  componentWillMount() {
    this.props.siteVersionActions.loadModes();
    this.props.siteVersionActions.loadVersions();
    this.props.siteVersionActions.loadSiteVersions();
    this.props.uploadActions.loadFiles();
  }

  /**
   * 
   * 
   * @param {any} siteVersion 
   * 
   * @memberOf HomePage
   */
  addSiteVersion(siteVersion) {
    this.props.siteVersionActions.addSiteVersion(siteVersion);
  }

  /**
   * 
   * 
   * @param {any} siteVersion 
   * 
   * @memberOf HomePage
   */
  updateSiteVersion(siteVersion) {
    this.props.siteVersionActions.updateSiteVersion(siteVersion);
  }

  /**
   * 
   * 
   * @param {any} siteVersion 
   * 
   * @memberOf HomePage
   */
  deleteSiteVersion(siteVersion) {
    this.props.siteVersionActions.deleteSiteVersion(siteVersion);
  }

  /**
   * 
   * 
   * 
   * @memberOf HomePage
   */
  handleOpen() {
    this.setState({ open: true });
  }

  /**
   * 
   * 
   * 
   * @memberOf HomePage
   */
  handleClose() {
    this.setState({ open: false });
  }

  /**
   * 
   * 
   * @param {any} UploaderData 
   * 
   * @memberOf HomePage
   */
  getUploaderData(UploaderData) {
    this.setState({ UploaderData });
  }

  /**
   * 
   * 
   * 
   * @memberOf HomePage
   */
  onSubmit() {
    this.setState({ open: false });
    this.props.uploadActions.uploadFiles(this.state.UploaderData);
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf HomePage
   */
  render() {
    // const uploadedFiles = this.props.files.map((fls, i) =>
    //   <TableRow key={i}>
    //     <TableRowColumn>
    //       <ul>
    //         {
    //           fls.files.map((file, i) => <li key={i}>{file.name}</li>)
    //         }
    //       </ul>
    //     </TableRowColumn>
    //     <TableRowColumn>
    //       {fls.ZipCheck ? 'True' : 'False'}
    //     </TableRowColumn>
    //     <TableRowColumn style={{ width: 24 }}>
    //       {fls.PDFCheck ? 'True' : 'False'}
    //     </TableRowColumn>
    //   </TableRow>
    // );

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
        <RaisedButton primary={true} label="Bulk Upload" onTouchTap={this.handleOpen} labelStyle={{ textTransform: 'none' }}/>
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <Uploader multiple={true} onDataChange={this.getUploaderData} />
        </Dialog>

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

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    modes: state.modes,
    versions: state.versions,
    siteVersion: state.siteVersion,
    files: state.uploadFile,
  };
}
/**
 * 
 * 
 * @param {any} dispatch 
 * @returns 
 */
function mapDispatchToProps(dispatch) {
  return {
    siteVersionActions: bindActionCreators(siteVersionActions, dispatch),
    uploadActions: bindActionCreators(uploadActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);