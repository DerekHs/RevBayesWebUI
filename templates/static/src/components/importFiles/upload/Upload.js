import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addConstraint, removeConstraint } from '../../../actions/species.js';


class Upload extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
    }


    render() {
        return (
            <div className="file is-centered is-large" onSubmit={this.onFormSubmit} style={{position:'relative'}}>
                <label className="file-label">
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
                </label>    
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
  
  