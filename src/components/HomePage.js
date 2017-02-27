import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as siteVersionActions from '../actions/siteVersionActions';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import GridRow from '../containers/GridRow';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteVersion: props.siteVersion,
      defaultSiteVersion: {
        versionValue: '',
        modeValue: '',
        isActive: false,
      },
    };
    this.addSiteVersion = this.addSiteVersion.bind(this);
    this.updateSiteVersion = this.updateSiteVersion.bind(this);
    this.deleteSiteVersion = this.deleteSiteVersion.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadModes();
    this.props.actions.loadVersions();
    this.props.actions.loadSiteVersions();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ siteVersion: nextProps.siteVersion });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  addSiteVersion(siteVersion) {
    this.props.actions.addSiteVersion(siteVersion);
  }

  updateSiteVersion(siteVersion) {
    this.props.actions.updateSiteVersion(siteVersion);
  }

  deleteSiteVersion(siteVersion) {
    this.props.actions.deleteSiteVersion(siteVersion);
  }

  render() {
    const gridRows = this.state.siteVersion.map((sv, i) =>
      <GridRow
        key={i}
        versions={this.props.versions}
        modes={this.props.modes}
        siteVersion={sv}
        deleteRow={this.deleteSiteVersion}
        updateSiteVersion={this.updateSiteVersion}
      />
    );
    return (
      <div>
        <RaisedButton primary={true} label="Add Site Version" onClick={() => this.addSiteVersion(this.state.defaultSiteVersion)} style={{ margin: '20px 0' }} />
        <Table selectable={false} height="220px" style={{ border: '1px solid rgb(224, 224, 224)' }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ textAlign: 'center' }} children="Version" />
              <TableHeaderColumn style={{ textAlign: 'center' }} children="Mode" />
              <TableHeaderColumn style={{ width: 24, textAlign: 'center' }} children="Activate" />
              <TableHeaderColumn style={{ width: 24, textAlign: 'center' }} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {gridRows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

HomePage.propTypes = {
  modes: PropTypes.array.isRequired,
  versions: PropTypes.array.isRequired,
  siteVersion: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modes: state.modes,
  versions: state.versions,
  siteVersion: state.siteVersion
});
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(siteVersionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

