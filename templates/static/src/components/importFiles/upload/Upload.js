import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addConstraint, removeConstraint } from '../../../actions/species.js';


import Dropzone from '../dropzone/Dropzone.js'

class Upload extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
    }


    render() {
            return (
                <div className="Upload">
                    <span className="Title">Import Nexus Files</span>
                    <div className="Content">
                        <Dropzone
                            onFilesAdded={this.props.handleChange}
                            disabled={false}
                        />
                    <div />
                    <div className="Files">
                        {this.props.appState.files.map(file => {
                            return (
                                <div key={file} className="Row">
                                    <img
                                        alt="file"
                                        className="FileIcon"
                                        src="../../public/iconfinder_file-text_298777.svg"
                                    />
                                    <span className="Filename">{file}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <label className="file-label">
                    <input 
                        className="file-input"
                        onChange={(e) => this.props.handleChange(e)}
                        type="file"
                        name="file"
                        id="fileUp"
                        multiple
                    />
                    <span className="file-cta">
                        <span className="file-label">
                            Choose File(s)...
                        </span>
                    </span>
                </label>     */}
            </div>
            
        )
    }
}



function mapStateToProps(state) {
    return {
      appState: state.appState
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      addAnimal,
      addConstraint,
      removeConstraint
    },
      dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Upload);
  
  