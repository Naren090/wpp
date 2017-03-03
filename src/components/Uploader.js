import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const style = {
  width: 400,
  height: 200,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
  }
  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles
    });
  }
  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    return (
      <div>
        <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} style={style}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <button type="button" onClick={this.onOpenClick}>
          Browse File
                </button>
        {this.state.files.length > 0 ? <div>
          <h2>Uploading {this.state.files.length} files...</h2>
          <div>{this.state.files.map((file, i) => <div key={i}>{file.name}</div>)}</div>
        </div> : null}
        <button type="button">
          Upload
                </button>
      </div>
    );
  }
}

export default Uploader;